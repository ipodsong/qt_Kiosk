package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Qna;

@Repository
public interface QnaDao extends JpaRepository<Qna, Integer>{
	Qna findByQnaSeq(int qnaSeq);
	ArrayList<Qna> findByUser_UserSeqOrderByQnaSeqDesc(int userSeq);
}
