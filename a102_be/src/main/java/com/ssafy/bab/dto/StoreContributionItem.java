package com.ssafy.bab.dto;

import lombok.Data;

@Data
public class StoreContributionItem implements Comparable<StoreContributionItem> {
	
	private int itemId;
	private String itemName;
	private int totalCount;
	private int supportPrice;
	private int itemAvailable;
	private String itemImgUrl;
	
	@Override
	public int compareTo(StoreContributionItem o) {
		// TODO Auto-generated method stub
		return this.itemId - o.itemId;
	}
	
}
