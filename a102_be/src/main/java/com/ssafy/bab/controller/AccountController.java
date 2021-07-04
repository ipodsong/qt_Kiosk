package com.ssafy.bab.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.ContributionResult;
import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserContribution;
import com.ssafy.bab.service.AccountService;
import com.ssafy.bab.service.AuthService;
import com.ssafy.bab.service.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/account")
public class AccountController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private AccountService userService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@GetMapping("/")
	public String mainPage() {	
		return "index.html";
	}

	//회원가입
	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody User user) {
		logger.info("signUp_AccountController - 호출");
		User userResult = userService.signUp(user);
		if(userResult == null)
			return new ResponseEntity<User>(userResult, HttpStatus.BAD_REQUEST);
		return new ResponseEntity<User>(userResult, HttpStatus.OK);
	}	

	//로그인(임시)
	@PostMapping("/signin")
	public ResponseEntity<User> signIn(@RequestBody User user) {
		
		User userResult = userService.signIn(user.getUserId(), user.getUserPwd());
		if(userResult == null) {
			return new ResponseEntity<User>(userResult,HttpStatus.BAD_REQUEST);
		}
		userResult.setUserPwd(null);
		return new ResponseEntity<User>(userResult,HttpStatus.OK);
	}
	
	//로그인jwt
	@PostMapping("/signinjwt")
	public ResponseEntity<JwtService.TokenRes> signInJwt(@RequestBody User user, HttpServletResponse res){
		JwtService.TokenRes signInJwt = authService.signIn(user.getUserId(), user.getUserPwd());
		if(signInJwt == null) {
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
		res.setHeader("token", signInJwt.getToken());
		return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
	}
	
	//로그인카카오
	@PostMapping("/signinkakao")
	public ResponseEntity<JwtService.TokenRes> signInKakao(@RequestBody User user, HttpServletResponse res){
		logger.info("signinkakao_AccountController - 호출");
		String userId = user.getUserId();
		user.setUserPwd(user.getUserId());
		User userKakao = userService.userInfoById("Kakao@"+userId);
		
		if (userKakao != null) {
			JwtService.TokenRes signInJwt = authService.signIn("Kakao@"+userId, user.getUserPwd());

			if(signInJwt == null) {
				signInJwt = new JwtService.TokenRes();
				return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.OK);
			}
			res.setHeader("token", signInJwt.getToken());
			return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
		}
		else {
			String pwd = userId;
			user.setUserPwd(userId);
			user.setUserId("Kakao@"+userId);
			user.setUserName(user.getUserName());
			user.setUserEmail("temp");
			user.setUserPhone("temp");
			
			User userResult = userService.signUp(user);
		
			if(userResult != null) {
				userKakao = userService.userInfoById(user.getUserId());
				if (userKakao != null) {
					JwtService.TokenRes signInJwt = authService.signIn(user.getUserId(), pwd);

					if(signInJwt == null) {
						return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
					}
					return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
				}
				else {
					JwtService.TokenRes signInJwt = null;
					return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
				}
			}
			JwtService.TokenRes signInJwt = null;
			
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
	}
	
	//로그인 네이버
	@PostMapping("/signinnaver")
	public ResponseEntity<JwtService.TokenRes> signInNaver(@RequestBody String Authorization, HttpServletResponse res){

		System.out.println(Authorization);
		
		JwtService.TokenRes signInJwt = null;
		
		User user = null;
		user = userService.signInNaver(Authorization);
		
		if(user == null) {
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
		
		String pwd = user.getUserPwd();
		
		// 회원가입 처리
		if(authService.userChk(user.getUserId()) == null) {
			
			User userResult = userService.signUp(user);
			if(userResult == null) {
				return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
			}
			
		}

		signInJwt = authService.signIn(user.getUserId(), pwd);

		if (signInJwt == null) {
			signInJwt = new JwtService.TokenRes();
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
		res.setHeader("token", signInJwt.getToken());
		return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.OK);

	}
	
	//중복확인
	@PostMapping("/userdupli")
	public ResponseEntity<User> userDupli(@RequestBody User user, HttpServletRequest req){
		User userNow = userService.userInfoById(user.getUserId());
		
		if(userNow == null) {
			return new ResponseEntity<User>(userNow, HttpStatus.OK);
		}
		else {
			userNow.setUserPwd(null);
			return new ResponseEntity<User>(userNow, HttpStatus.BAD_REQUEST);
		}
	}
	
	//jwt를 받아와서 유저번호를 돌려준다
	@GetMapping("/userseq")
	public ResponseEntity<Integer> getUserSeq(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		if(userSeq == -1) {
			return new ResponseEntity<Integer>(userSeq, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Integer>(userSeq, HttpStatus.OK);
	}
	
	//jwt를 받아와서 유저정보를 돌려준다
	@GetMapping("/userinfo")
	public ResponseEntity<User> getUserInfo(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		User userInfo = userService.userInfo(userSeq);
		return new ResponseEntity<User>(userInfo, HttpStatus.OK);
	}
	
	//jwt를 받아와서 후원금액, 후원횟수, 함께한 일수를 돌려준다
	@GetMapping("/userwithus")
	public ResponseEntity<UserContribution> userWithUs(HttpServletRequest req){
		String jwt = req.getHeader("token");
		UserContribution userWithUs = new UserContribution();
		int userSeq = jwtService.decode(jwt);
		
		userWithUs.setUserWithUs(userService.userWithUs(userSeq));
		userWithUs.setContributionTotal(userService.userInfo(userSeq).getUserTotalContributionAmount());
		userWithUs.setContributionCount(userService.userContributionCount(userSeq));
		
		return new ResponseEntity<UserContribution>(userWithUs, HttpStatus.OK);
	}
	
	//jwt를 받아와서 유저의 후원 상세정보를 돌려준다
	@GetMapping("/usercontribution")
	public ResponseEntity<List<ContributionResult>> userContribution(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		ArrayList<ContributionResult> userContribution = userService.userContribution(userSeq);
		return new ResponseEntity<List<ContributionResult>>(userContribution, HttpStatus.OK);
	}
	
	// 비밀번호 확인
	@PostMapping("/pwdcheck")
	public ResponseEntity<String> pwdCheck(@RequestBody String pwd, HttpServletRequest req){
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = authService.userSeqChk(userSeq);
		
		if(user == null) {
			return new ResponseEntity<String>("FAIL", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>(userService.userPwdChk(user, pwd), HttpStatus.OK);
			
	}
	
	@ApiOperation(value = "회원정보 변경", notes = "회원 이름, 핸드폰 번호, 이메일 주소 변경 가능", response = List.class)
	@PostMapping("/update")
	public ResponseEntity<String> userUpdate(@ApiParam(value = "변경 원하는 값 ", required = true) @RequestBody User newUser, HttpServletRequest req) throws Exception {
		logger.info("userUpdate_AccountController - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
		
		User user = userDao.findByUserSeq(userSeq);
		System.out.println(newUser);
        if(user == null || (newUser.getUserEmail() == null && newUser.getUserPhone() == null && newUser.getUserName() == null)) return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		
        
        String result= userService.userUpdate(user, newUser);
        System.out.println(result);
		return new ResponseEntity<String>(result, HttpStatus.OK);

	}
	
}
