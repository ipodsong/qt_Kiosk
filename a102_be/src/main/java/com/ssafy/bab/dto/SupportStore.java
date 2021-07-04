package com.ssafy.bab.dto;

import lombok.Data;

@Data
public class SupportStore {

	private int storeId;
	private String storeName;
	private String storeLocation;
	private String storeCategory;
	private int storeItemAvailable;
	private int storeItemTotal;
	
}
