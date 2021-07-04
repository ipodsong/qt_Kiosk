package com.ssafy.bab.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.CPaymentInfo;
import com.ssafy.bab.dto.GPaymentInfo;
import com.ssafy.bab.dto.GdreamResult;
import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.KPaymentInfo;
import com.ssafy.bab.dto.KakaoPaySuccessData;
import com.ssafy.bab.dto.NPaymentInfo;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.KakaoPayService;
import com.ssafy.bab.service.PaymentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("PaymentController V1")
@RestController
@RequestMapping("/payment")
public class PaymentController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private KakaoPayService kakaoPayService;
	
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private JwtService jwtService;
	
	
	@ApiOperation(value = "카카오페이 결제", notes = "결제할 품목들을 받아와 카카오페이 결제 모듈로 연결해준다", response = String.class)
	@PostMapping("/kakaopay")
	public String kakaoPay(@ApiParam(value = "아이템 목록과 총 개수, 총 가격", required = true) @RequestBody KPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("kakaoPay_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);

        paymentInfo.setUserSeq(userSeq);
        paymentInfo.setCid("TC0ONETIME");
        
        return kakaoPayService.kakaoPayReady(paymentInfo);
	}
	
	@GetMapping("/kakaopaySuccess")
	public KakaoPaySuccessData kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
		logger.info("kakaoPaySuccess get............................................");
		logger.info("kakaoPaySuccess pg_token : " + pg_token);
        
        return kakaoPayService.kakaoPayInfo(pg_token);
        
    }
	
	@ApiOperation(value = "네이버페이 결제 처리결과 저장", notes = "결제 내역을 받아와 DB에 저장", response = List.class)
	@PostMapping("/naverpay")
	public ResponseEntity<String> naverPay(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody NPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("naverPay_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);

        paymentInfo.setUserSeq(userSeq);
        
        return new ResponseEntity<String>(paymentService.checkNaverPayTransaction(paymentInfo), HttpStatus.OK);
    	
	}
	
	@ApiOperation(value = "아임포트 결제 처리결과 저장", notes = "결제 내역을 받아와 DB에 저장", response = List.class)
	@PostMapping("/iamport")
	public ResponseEntity<String> iamport(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody IPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("iamport_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);

        paymentInfo.setUserSeq(userSeq);
        
        return new ResponseEntity<String>(paymentService.checkIamPortTransaction(paymentInfo), HttpStatus.OK);
    	
	}
	
	@ApiOperation(value = "키오스크 일반 신용카드 결제 처리결과 저장", notes = "결제 내역을 받아와 DB에 저장", response = List.class)
	@PostMapping("/creditcard")
	public ResponseEntity<String> creditCard(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody CPaymentInfo paymentInfo) throws Exception {
		logger.info("creditCard_payment - 호출");
		
		String result = paymentService.checkCreditCardTransaction(paymentInfo);
		if(result == "SUCCESS")
			return new ResponseEntity<String>(result, HttpStatus.OK);
		else
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "지드림카드 사용", notes = "지드림카드 사용 내역을 받아와 DB에 저장, 후원처리", response = List.class)
	@PostMapping("/gdream")
	public ResponseEntity<GdreamResult> gDream(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody GPaymentInfo paymentInfo) throws Exception {
		logger.info("gDream_payment - 호출");
		GdreamResult result = paymentService.checkGDreamTransaction(paymentInfo);
		if(result != null)
			return new ResponseEntity<GdreamResult>(result, HttpStatus.OK);
		else
			return new ResponseEntity<GdreamResult>(result, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "카드 정보 반환", notes = "카드 번호 전달시 카드 종류 반환 ", response = String.class)
	@PostMapping("/cardtype")
	public ResponseEntity<String> getRFIDCardType(@RequestParam("cardNumber") String cardNumber) throws Exception{
		logger.info("getRFIDCardType_payment - 호출");
		return new ResponseEntity<String>(paymentService.getRFIDCardType(cardNumber), HttpStatus.OK);
	}
	
	@ApiOperation(value = "카드 정보 저장", notes = "카드 번호, 종류 입력받아 저장 ", response = String.class)
	@PostMapping("/cardcreate")
	public ResponseEntity<String> createRFIDCard(@RequestParam("cardNumber") String cardNumber, @RequestParam("cardType") String cardType) throws Exception{
		logger.info("createRFIDCard_payment - 호출");
		String result = paymentService.createRfidCard(cardNumber, cardType);
		if(result == "SUCCESS")
			return new ResponseEntity<String>(result, HttpStatus.OK);
		else
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
	}
	
	@ApiOperation(value = "문자 전송", notes = "유저별 최신 후원기록을 받아와서 문자전송", response = String.class)
	@GetMapping("/sendmsg")
	public ResponseEntity<String> sendMsg() throws Exception{
		logger.info("notOrderDoneList_Store - 호출");
		return new ResponseEntity<String>(paymentService.sendMsg(), HttpStatus.OK);
	}
	
//	@GetMapping("/kakaopayFail")
//	public String kakaoPayFail() {
//		logger.info("kakaoPayFail_payment - 호출");
//		return "fail.html";
//	}
//	
//	@GetMapping("/kakaopayCancel")
//	public String kakaoPayCancel() {
//		logger.info("kakaoPayCancel_payment - 호출");
//		return "cancel.html";
//	}
	
	
	
}
	