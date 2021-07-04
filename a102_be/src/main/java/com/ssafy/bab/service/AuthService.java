package com.ssafy.bab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.User;

@Service
public class AuthService {
	
	@Autowired
    private UserDao userDao;
	
	@Autowired
    private JwtService jwtService;
    
	@Autowired
    PasswordEncodingService passwordEncoding;
	
    // 로그인
    public JwtService.TokenRes signIn(String userId, String userPwd) {
        User user = userDao.findByUserId(userId);
        
        // 회원 정보가 존재하지 않거나, 아이디가 틀렸음
        if (user == null) {
            return null;
        }
        // 로그인 성공
        if (passwordEncoding.matches(userPwd, user.getUserPwd())) {
            // 토큰 생성
            JwtService.TokenRes token = new JwtService.TokenRes(jwtService.create(user.getUserSeq()));
            return token;
        }

        // 비밀번호가 틀렸을 때
        return null;
    }
    
    public User userChk(String userId) {
    	return userDao.findByUserId(userId);
    }
    
    public User userSeqChk(int userSeq) {
    	return userDao.findByUserSeq(userSeq);
    }
}
