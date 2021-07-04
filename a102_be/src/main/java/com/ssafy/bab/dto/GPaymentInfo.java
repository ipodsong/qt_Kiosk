package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class GPaymentInfo {

	private String gDreamApproval;
	private List<PaymentItem> itemList;
	private int totalGDreamAmount;
	private int totalCount;
	private String paidAt;

}
