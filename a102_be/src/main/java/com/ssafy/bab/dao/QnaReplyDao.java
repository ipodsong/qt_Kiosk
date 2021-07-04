package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;

@Repository
public interface QnaReplyDao extends JpaRepository<QnaReply, Integer>{
	QnaReply findByReplySeq(int replySeq);
}
