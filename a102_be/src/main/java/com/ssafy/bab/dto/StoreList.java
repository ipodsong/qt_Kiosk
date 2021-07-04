package com.ssafy.bab.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StoreList implements Serializable{
	private int storeId;
	private String storeName;
	private String storeLocation;
	private String storeCategory;
	private int storeItemAvailable;
	private int storeKiosk;
}
