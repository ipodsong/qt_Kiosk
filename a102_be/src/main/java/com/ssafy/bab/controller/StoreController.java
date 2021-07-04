package com.ssafy.bab.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.MyStore;
import com.ssafy.bab.dto.OrderIdAndPaymentId;
import com.ssafy.bab.dto.StoreContributionItem;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.StoreService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("StoreController V1")
@RestController
@RequestMapping(value = "/store")
public class StoreController {

	private static final Logger logger = LoggerFactory.getLogger(StoreController.class);
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private StoreService storeService;
	
	
	@ApiOperation(value = "가게 기본 정보 ", notes = "가게 기본 정보를 반환한다", response = String.class)
	@GetMapping("/basicinfo")
	public ResponseEntity<MyStore> storeBasicInfo(HttpServletRequest req) throws Exception {
		logger.info("basicinfo_Store - 호출");
		
		MyStore result = null;
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니라면 잘못된 요청임
		if(user == null || user.getStore() == null) {
			return new ResponseEntity<MyStore>(result, HttpStatus.BAD_REQUEST);
		}
     
        result = storeService.getMyStore(user.getStore().getStoreId());
        return new ResponseEntity<MyStore>(result, HttpStatus.OK);

	}
	
	@ApiOperation(value = "가게 후원 내역 ", notes = "startDate와 endDate를 받아와 해당 기간의 후원 내역을 반환한다.", response = String.class)
	@PostMapping("contributionlist")
	public ResponseEntity<List<StoreContributionItem>> contributionItemList(@RequestParam(required = true) String startDate, @RequestParam(required = true) String endDate, HttpServletRequest req) throws Exception {
//		logger.info("contributionItemList_Store - 호출");
		
		ArrayList<StoreContributionItem> result = null;
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니라면 잘못된 요청임
		if(user == null || user.getStore() == null) {
			return new ResponseEntity<List<StoreContributionItem>>(result, HttpStatus.BAD_REQUEST);
		}
		
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		result = (ArrayList<StoreContributionItem>) storeService.getContributionItemList(user.getStore().getStoreId(), transFormat.parse(startDate), transFormat.parse(endDate));
		
		return new ResponseEntity<List<StoreContributionItem>>(result, HttpStatus.OK);

	}
	
	@ApiOperation(value = "가게 메뉴 추가 ", notes = "itemName, itemPrice, (메뉴 사진)을 입력받아 메뉴등록", response = String.class)
	@PostMapping("/item/create")
	public ResponseEntity<String> itemCreate(@ApiParam(value = "storeName, storePrice, (supportPrice)", required = true) Item item, 
			@ApiParam(value = "메뉴 사진", required = false) @RequestParam(value="file", required = false) MultipartFile file,
			HttpServletRequest req) throws Exception {
		logger.info("itemCreate_Store - 호출");
		
		String result = "FAIL";
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니거나, 메뉴 이름 또는 가격이 없다면 잘못된 요청임
		if(user == null || user.getStore() == null || user.getStore().getStoreKiosk() == 0 || item.getItemName() == null || item.getItemPrice() == null) {
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
		}
        
        item.setStoreId(user.getStore().getStoreId());
     
        result = storeService.itemCreate(item, file);
        return new ResponseEntity<String>(result, HttpStatus.OK);

		
	}
	
	@ApiOperation(value = "가게 메뉴 리스트 가져오기", notes = "메뉴 리스트 가져오기", response = String.class)
	@GetMapping("/itemlist")
	public ResponseEntity<List<Item>> itemList(HttpServletRequest req) throws Exception {
//		logger.info("itemList_Store - 호출");
		
		ArrayList<Item> result = null;
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니거나, 메뉴 이름 또는 가격이 없다면 잘못된 요청임
		if(user == null || user.getStore() == null || user.getStore().getStoreKiosk() == 0) {
			return new ResponseEntity<List<Item>>(result, HttpStatus.BAD_REQUEST);
		}
     
        result = storeService.getItemList(user.getStore().getStoreId());
        return new ResponseEntity<List<Item>>(result, HttpStatus.OK);

		
	}
	
	@ApiOperation(value = "가게 메뉴 수정", notes = "itemId, itemName, itemPrice, itemImgUrl, (메뉴사진)을 입력받아 메뉴수정 ", response = String.class)
	@PostMapping("/item/update")
	public ResponseEntity<String> itemUpdate(@ApiParam(value = "itemId, storeId, 메뉴 이름, 가격, (후원 가격)", required = true) Item item, 
			@ApiParam(value = "메뉴 사진", required = false) @RequestParam(value="file", required = false) MultipartFile file,
			HttpServletRequest req) throws Exception {
		logger.info("itemUpdate_Store - 호출");
		
		String result = "FAIL";
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니거나 itemName, itemPrice, imgURL중 빈 값이 있다면 잘못된 요청임
		if(user == null || user.getStore() == null || user.getStore().getStoreKiosk() == 0 || item.getItemId() == 0 || item.getItemName() == null || item.getItemPrice() == null || item.getItemImgUrl() == null) {
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
		}
        
        item.setStoreId(user.getStore().getStoreId());
     
        result = storeService.itemUpdate(item, file);
        return new ResponseEntity<String>(result, HttpStatus.OK);
		
	}
	
	@PostMapping("/item/delete/{itemId}")
	public ResponseEntity<String> itemDeletePost(@ApiParam(value = "itemId", required = true) @PathVariable int itemId, HttpServletRequest req) throws Exception {
		return itemDelete(itemId, req);
	}
	
	@ApiOperation(value = "가게 메뉴 삭제", notes = "itemId 입력받아 메뉴 삭제", response = String.class)
	@GetMapping("/item/delete/{itemId}")
	public ResponseEntity<String> itemDelete(@ApiParam(value = "itemId", required = true) @PathVariable int itemId, HttpServletRequest req) throws Exception {
		logger.info("itemDelete_Store - 호출");
		
		String result = "FAIL";
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(userSeq);
        
        // user 정보가 없거나, 후원 가게 사장이 아니거나 itemId가 없다면 잘못된 요청임
		if(user == null || user.getStore() == null || user.getStore().getStoreKiosk() == 0 || itemId == 0) {
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
		}
     
        result = storeService.itemDelete(itemId, user.getStore().getStoreId());
        System.out.println(result);
        return new ResponseEntity<String>(result, HttpStatus.OK);
		
	}
	
	@ApiOperation(value = "orderList 반환", notes = "order_done = null인 payment_id 및 payment_gdream_id 반환", response = List.class)
	@GetMapping("/orderlist")
	public ResponseEntity<List<OrderIdAndPaymentId>> notOrderDoneList(@RequestParam("storeid") int storeId) throws Exception{
		logger.info("notOrderDoneList_Store - 호출");
		return new ResponseEntity<List<OrderIdAndPaymentId>>(storeService.getNotOrderDoneList(storeId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "orderList 업데이트", notes = "입력받은 주문번호를 갖는 orders튜플들의 ", response = List.class)
	@PostMapping("/orderlist")
	public ResponseEntity<String> orderDoneUpdate(@RequestParam("storeid") int storeId, @RequestParam("orderNum") String paymentId) throws Exception{
		logger.info("orderDoneUpdate_Store - 호출");
		String result = storeService.orderDonUpdate(storeId, paymentId);
		if(result == "SUCCESS") return new ResponseEntity<String>(result, HttpStatus.OK);
		else return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
	}
}
