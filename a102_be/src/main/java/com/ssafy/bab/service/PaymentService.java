package com.ssafy.bab.service;

import java.text.ParseException;

import com.ssafy.bab.dto.CPaymentInfo;
import com.ssafy.bab.dto.GPaymentInfo;
import com.ssafy.bab.dto.GdreamResult;
import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.NPaymentInfo;

public interface PaymentService {
	public String checkNaverPayTransaction(NPaymentInfo paymentInfo) throws ParseException;
	public String checkIamPortTransaction(IPaymentInfo paymentInfo);
	public String checkCreditCardTransaction(CPaymentInfo paymentInfo) throws ParseException;
	public GdreamResult checkGDreamTransaction(GPaymentInfo paymentInfo) throws ParseException;
	public String getRFIDCardType(String cardNumber);
	public String createRfidCard(String cardNumber, String cardType);
	public String sendMsg();
}
