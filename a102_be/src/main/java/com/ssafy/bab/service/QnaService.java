package com.ssafy.bab.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;

public interface QnaService {
	
	// QnA 질문 작성
	public String qnaCreate(Qna qna);
	
	// QnA 답변 작성
	public String replyCreate(QnaReply qnaReply);
	
	// QnA 글 목록 가져오기
	public Page<Qna> getList(int page);
	
	// QnA 마이페이지에서 글 목록 가져오기
	public List<Qna> getmyPageQnaList(int userSeq);
	
	// QnA 질문(+답변) 상세 내용 가져오기
	public Qna qnaDetail(Qna qna);
	
	// QnA 답변 상세 내용 가져오기
	public QnaReply replyDetail(QnaReply qnaReply, int userSeq);
	
	// QnA 질문 수정
	public String qnaUpdate(Qna qna);
	
	// QnA 질문(+답변) 삭제
	public String qnaDelete(Qna qna);
}
