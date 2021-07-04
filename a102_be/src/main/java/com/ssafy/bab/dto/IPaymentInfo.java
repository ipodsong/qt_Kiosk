package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class IPaymentInfo {
	private String imp_uid;
	private String merchant_uid;
	private long paid_at;
	private int paid_amount;
	
	private List<PaymentItem> itemList;
	private int userSeq;
	
	private String contributorPhone;
}
