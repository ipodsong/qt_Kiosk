package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class NPaymentInfo {
	private String paymentId;
	private String merchantId;
	private String tradeConfirmYmdt;
	private int totalPayAmount;
	
	private List<PaymentItem> itemList;
	private int userSeq;
	
	private String contributorPhone;
	
}
