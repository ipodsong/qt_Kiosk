package com.ssafy.bab.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.MyStore;
import com.ssafy.bab.dto.OrderIdAndPaymentId;
import com.ssafy.bab.dto.StoreContributionItem;

public interface StoreService {

	// 가게 기본 정보 반환
	public MyStore getMyStore(int storeId);
	
	// 가게 후원된 메뉴 리스트 반환
	public List<StoreContributionItem> getContributionItemList(int storeId, Date startDate, Date endDate);
	
	// 메뉴 추가
	public String itemCreate(Item item, MultipartFile uploadFile);

	// 메뉴 리스트
	public ArrayList<Item> getItemList(int storeId);
	
	// 메뉴 수정
	public String itemUpdate(Item item, MultipartFile uploadFile);

	// 메뉴 삭제
	public String itemDelete(int itemId, int storeId);
	
	// 주문완료되지 않은 paymentId 리스트
	public List<OrderIdAndPaymentId> getNotOrderDoneList(int storeId);
	
	// 주문완료된 orders 튜플 업데이트
	public String orderDonUpdate(int storeId, String paymentId) throws ParseException;
}
