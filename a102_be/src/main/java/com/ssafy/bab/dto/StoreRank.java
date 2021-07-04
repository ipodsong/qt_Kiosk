package com.ssafy.bab.dto;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StoreRank implements Serializable{
	private int storeId;
	private int storeItemAvailable;
	private int storeTotalContributionAmount;
	private int storeItemTotal;
	
	private String storeName;
	private String storeLocation;
	private String storeCategory;
	
	private int storeKiosk;
	private int locationId;
}