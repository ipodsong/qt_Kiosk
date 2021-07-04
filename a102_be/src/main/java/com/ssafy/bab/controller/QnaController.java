package com.ssafy.bab.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.PasswordEncodingService;
import com.ssafy.bab.service.QnaService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/qna")
public class QnaController {

	private static final Logger logger = LoggerFactory.getLogger(QnaController.class);
	
	@Autowired
	private QnaService qnaService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	PasswordEncodingService passwordEncoding;
	
	@ApiOperation(value = "QnA 질문 하기", notes = "글 제목, 내용, 비밀글여부와 헤더에 jwtToken", response = List.class)
	@PostMapping("/create")
	public ResponseEntity<String> qnaCreate(@ApiParam(value = "글 제목, 내용, 비밀글 여부 ", required = true) @RequestBody Qna qna, HttpServletRequest req) throws Exception {
		logger.info("qnaCreate_QnaController - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
		
        //테스트
//		User user = userDao.findByUserSeq(1);
		//프론트
		User user = userDao.findByUserSeq(userSeq);
        if(user == null || qna.getQnaContent() == null || qna.getQnaTitle() == null) return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		
        qna.setUser(user);
        
		if("SUCCESS" == qnaService.qnaCreate(qna))
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		else
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@ApiOperation(value = "QnA 답변하기", notes = "원문 qnaSeq, 답변 제목, 답변 내용과 헤더에 jwtToken", response = List.class)
	@PostMapping("/reply/create")
	public ResponseEntity<String> replyCreate(@ApiParam(value = "원문 qnaSeq, 답변 제목, 답변 내용", required = true) @RequestBody QnaReply qnaReply, HttpServletRequest req) throws Exception {
		logger.info("replyCreate_QnaController - 호출");
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
		
//		******************************
//		관리자 계정인지 체크하는 부분 필요
//		******************************
		
		// 테스트
//		User user = userDao.findByUserSeq(1);
		//프론트
		User user = userDao.findByUserSeq(userSeq);
		if(user == null || qnaReply.getReplyContent() == null || qnaReply.getReplyTitle() == null) return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		
		qnaReply.setUser(user);
		System.out.println("dpdpd....");
        if("SUCCESS" == qnaService.replyCreate(qnaReply))
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		else
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ApiOperation(value = "QnA 게시판 불러오기", notes = "페이지 번호를 기준으로 글 목록 불러옴", response = List.class)
	@GetMapping("/{page}")
	public ResponseEntity<Page<Qna>> qnaList(@ApiParam(value = "page(0부터 시작)", required = true) @PathVariable int page) throws Exception {
		logger.info("qnaList_QnaController - 호출");
		return new ResponseEntity<Page<Qna>>(qnaService.getList(page), HttpStatus.OK);
	}
	
	@ApiOperation(value = "마이페이지에서 QnA 게시판 불러오기", notes = " 헤더의 jwtToken 기준으로 글 목록 불러옴", response = List.class)
	@GetMapping("/mypage")
	public ResponseEntity<List<Qna>> myPageQnaList(HttpServletRequest req) throws Exception {
		logger.info("qnaList_QnaController - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
		
		ArrayList<Qna> result = null;
		
		// 테스트
//		User user = userDao.findByUserSeq(4);
		// 프론트
		User user = userDao.findByUserSeq(userSeq);
		if(user == null) return new ResponseEntity<List<Qna>>(result, HttpStatus.BAD_REQUEST);
		
		return new ResponseEntity<List<Qna>>(qnaService.getmyPageQnaList(user.getUserSeq()), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 질문 및 답변 상세내용", notes = "qnaSeq, qnaSecret와  헤더의 jwtToken으로 글 상세내용을 불러온다. qnaSecret=1인데 받아온 userSeq와 qnaSeq의 userSeq가 다를 경우 null return", response = List.class)
	@PostMapping("/read")
	public ResponseEntity<Qna> qnaDetail(@ApiParam(value = "qnaSeq, qnaSecret", required = true) @RequestBody Qna qna, HttpServletRequest req) throws Exception {
		logger.info("qnaDetail_QnaController - 호출");

		Qna result = null;
		
		if(qna.getQnaSecret() == 1) {		
			String jwt = req.getHeader("token");
			int userSeq = jwtService.decode(jwt);
			
			// 테스트
//			User user = userDao.findByUserSeq(1);
			// 프론트
			User user = userDao.findByUserSeq(userSeq);
			if(user == null) return new ResponseEntity<Qna>(result, HttpStatus.BAD_REQUEST);
			qna.setUser(user);

		}
		
		result = qnaService.qnaDetail(qna);

		return new ResponseEntity<Qna>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 답변 상세내용", notes = "replySeq, qnaSeq, replySecret과  헤더의 jwtToken으로 답변 상세내용을 불러온다. qnaSecret=1인데 받아온 userSeq와 qnaSeq의 userSeq가 다를 경우 null return", response = List.class)
	@PostMapping("/reply/read")
	public ResponseEntity<QnaReply> replyDetail(@ApiParam(value = "replySeq, qnaSeq, replySecret", required = true) @RequestBody QnaReply qnaReply, HttpServletRequest req) throws Exception {
		logger.info("replyDetail_QnaController - 호출");

		QnaReply result = null;
		
		if(qnaReply.getReplySecret() == 1) {		
			String jwt = req.getHeader("token");
			int userSeq = jwtService.decode(jwt);
			
			// 테스트
//			User user = userDao.findByUserSeq(1);
			// 프론트
			User user = userDao.findByUserSeq(userSeq);
			if(user == null) return new ResponseEntity<QnaReply>(result, HttpStatus.BAD_REQUEST);
			result = qnaService.replyDetail(qnaReply, user.getUserSeq());
		}else
			result = qnaService.replyDetail(qnaReply, 0);

		return new ResponseEntity<QnaReply>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 질문 수정", notes = "qnaSeq, 글제목, 내용, 비밀글 여부, 헤더의 jwtToken을 받아 질문 수정", response = List.class)
	@PostMapping("/update")
	public ResponseEntity<String> qnaUpdate(@ApiParam(value = "qnaSeq, qnaSecret", required = true) @RequestBody Qna qna, HttpServletRequest req) throws Exception {
		logger.info("qnaUpdate_QnaController - 호출");
		
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		
		// 테스트
//		User user = userDao.findByUserSeq(1);
		// 프론트
		User user = userDao.findByUserSeq(userSeq);
		if (user == null || qna.getQnaContent() == null || qna.getQnaTitle() == null)
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		qna.setUser(user);
		
		return new ResponseEntity<String>(qnaService.qnaUpdate(qna), HttpStatus.OK);
	}
	
	@ApiOperation(value = "QnA 질문 삭제", notes = "qnaSeq(Path)와 헤더의 jwtToken을 받아 질문 삭제", response = List.class)
	@PostMapping("/delete/{qnaSeq}")
	public ResponseEntity<String> qnaDelete(@ApiParam(value = "qnaSeq", required = true) @PathVariable int qnaSeq, HttpServletRequest req) throws Exception {
		logger.info("qnaDelete_QnaController - 호출");
		
		Qna qna = new Qna();
		qna.setQnaSeq(qnaSeq);
		
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		
		// 테스트
//		User user = userDao.findByUserSeq(1);
		// 프론트
		User user = userDao.findByUserSeq(userSeq);
		if (user == null)
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		qna.setUser(user);
		
		return new ResponseEntity<String>(qnaService.qnaDelete(qna), HttpStatus.OK);
	}
	
}
