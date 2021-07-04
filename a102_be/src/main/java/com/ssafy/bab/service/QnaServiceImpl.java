package com.ssafy.bab.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.QnaDao;
import com.ssafy.bab.dao.QnaReplyDao;
import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;

@Service
public class QnaServiceImpl implements QnaService {
	
	@Autowired
	private QnaDao qnaDao;
	
	@Autowired
	private QnaReplyDao qnaReplyDao;
	
	@Override
	public String qnaCreate(Qna qna) {

		qna.setQnaDate(new Date());
		qnaDao.save(qna);
		
		return "SUCCESS";
	}

	@Override
	public String replyCreate(QnaReply qnaReply) {
		
		Qna question = qnaDao.findByQnaSeq(qnaReply.getQnaSeq());

		qnaReply.setReplyDate(new Date());
		qnaReply.setReplySecret(question.getQnaSecret());
		qnaReply = qnaReplyDao.save(qnaReply);

		question.setQnaReply(qnaReply);
		qnaDao.save(question);
		System.out.println("afdsssssssss");
		return "SUCCESS";
	}

	@Override
	public Page<Qna> getList(int page) {
//												 페이지, 사이즈, qnaSeq 기준으로 내림차순 정렬
		PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("qnaSeq").descending());
		Page<Qna> result = qnaDao.findAll(pageRequest);
		return result;
	}
	
	@Override
	public List<Qna> getmyPageQnaList(int userSeq) {
		ArrayList<Qna> result = qnaDao.findByUser_UserSeqOrderByQnaSeqDesc(userSeq);
		return result;
	}

	@Override
	public Qna qnaDetail(Qna qna) {

		Qna result = qnaDao.findByQnaSeq(qna.getQnaSeq());
		if(qna.getQnaSecret() == 0 || result.getUser().getUserSeq() == qna.getUser().getUserSeq()) return result;
		
		return null;
	}

	@Override
	public QnaReply replyDetail(QnaReply qnaReply, int userSeq) {
		
		Qna qna = qnaDao.findByQnaSeq(qnaReply.getQnaSeq());
		if(qna == null) return null;

		QnaReply result = qnaReplyDao.findByReplySeq(qnaReply.getReplySeq());
		if(qnaReply.getReplySecret() == 0 || qna.getUser().getUserSeq() == userSeq) return result;
		
		return null;
	}
	
	@Override
	public String qnaUpdate(Qna qna) {
		
		Qna newQna = qnaDao.findByQnaSeq(qna.getQnaSeq());
		if(newQna == null) return "FAIL";
		if(newQna.getQnaReply() != null) return "FAIL";
		if(newQna.getUser().getUserSeq() != qna.getUser().getUserSeq()) return "FAIL";
		newQna.setQnaContent(qna.getQnaContent());
		newQna.setQnaTitle(qna.getQnaTitle());
		newQna.setQnaSecret(qna.getQnaSecret());
		newQna.setQnaDate(new Date());
		qnaDao.save(newQna);
		
		return "SUCCESS";
	}

	@Override
	public String qnaDelete(Qna qna) {
		
		Qna deleteQna = qnaDao.findByQnaSeq(qna.getQnaSeq());
		if(deleteQna == null) return "FAIL";
		if(deleteQna.getUser().getUserSeq() != qna.getUser().getUserSeq()) return "FAIL";
		
		qnaDao.delete(deleteQna);
		
		return "SUCCESS";
	}

}
