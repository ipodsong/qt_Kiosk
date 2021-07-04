package com.ssafy.bab.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MyStore {

	private int storeId;
	private String storeName;
	private String storeCategory;
	private String storeLocation;
	private Date storeRegDate;
	private String storePhone;
	private int storeItemAvailable;				// 현재 이용가능한 그릇 개수
	private int storeItemTotal;					// 총 후원딘 그릇 개수
	private int storeTotalContributionAmount;	// RegDate부터 지금까지의 후원금액
	private int storeSettlementDay;
	
}
