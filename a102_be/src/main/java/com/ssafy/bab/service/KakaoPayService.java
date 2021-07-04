package com.ssafy.bab.service;

import org.springframework.http.HttpHeaders;

import com.ssafy.bab.dto.KakaoPaySuccessData;
import com.ssafy.bab.dto.KPaymentInfo;

public interface KakaoPayService {

	public HttpHeaders headers();
	public String kakaoPayReady(KPaymentInfo itemsInfo);
	public KakaoPaySuccessData kakaoPayInfo(String pg_token);
	
}
