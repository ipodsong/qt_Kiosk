package com.ssafy.bab.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StoreDetail {

	private int storeId;
	private String storeName;
	private String storeCategory;
	private String storeLocation;
	private String storePhone;
	private int storeContributionAmount;
	
}
