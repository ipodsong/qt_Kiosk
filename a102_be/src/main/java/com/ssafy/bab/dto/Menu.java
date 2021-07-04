package com.ssafy.bab.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Menu {

	private int storeId;
	private int itemId;
	private String itemName;
	private int itemPrice;
	private int itemAvailable;
	private int itemContributionAmount;
	private String ItemImgUrl;
	
}
