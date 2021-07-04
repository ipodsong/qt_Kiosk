package com.ssafy.bab.dto;

import lombok.Data;

@Data
public class KakaoPaySuccessData {
	private String paymentId;
	private KakaoPayApproval kakaoPayApproval;
}
