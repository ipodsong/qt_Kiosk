package com.ssafy.bab.dto;

import java.util.Date;

import lombok.Data;

@Data
public class StoreContribution {

	private int contributionId;
	private int itemId;
	private Integer userSeq;
	private Integer contributorSeq;
	private String contributionMessage;
	private Date contributionDate;
	private Date contributionDateUsed;
	private String paymentId;
	
}
