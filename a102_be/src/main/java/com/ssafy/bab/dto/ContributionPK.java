package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Column;

import lombok.Data;

@Data
public class ContributionPK implements Serializable {

//	@Column
	private int itemId;
//	@Column
	private int storeId;
	@Column
	private int contributionId;
	
}
