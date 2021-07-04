package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name="qna_reply")
public class QnaReply {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int replySeq;
	
	@ManyToOne
	@JoinColumn(name="user_seq")
	private User user;
	
	private int qnaSeq;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date replyDate;
	
	private String replyTitle;
	private String replyContent;
	private int replySecret;
}
