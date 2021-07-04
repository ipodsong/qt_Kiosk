package com.ssafy.bab.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class ContributionResult implements Serializable {

	private int contributionId;
	private int storeId;
	private String storeName;
	private int itemId;
	private String itemName;
	private User user;
	private Contributor contributor;
	private String contributionMessage;
	private String contributionAnswer;
	private Date contributionDate;
	private Date contributionDateUsed;
	private int contributionUse;
	private Payment payment;
	
}
