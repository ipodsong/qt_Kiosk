package com.ssafy.bab.dto;

import lombok.Data;

@Data
public class KakaoPayInfo {
	private KPaymentInfo paymentInfo;
	private String partner_order_id;
	private String partner_user_id;
	
}
