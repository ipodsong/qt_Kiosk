package com.ssafy.bab.dto;

import java.util.List;
import lombok.Data;

@Data
public class CPaymentInfo {
	
	private String approvalNumber;
	private List<PaymentItem> itemList;
	private int totalAmount;
	private int totalCount;
	private String paidAt;
	
	private String contributorPhone;
	
}
