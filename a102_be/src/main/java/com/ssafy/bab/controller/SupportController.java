package com.ssafy.bab.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.SupportStore;
import com.ssafy.bab.service.SupportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("SupportController V1")
@RestController
@RequestMapping("/support")
public class SupportController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private SupportService supportService;
	
	@ApiOperation(value = "후원 가게 목록", notes = "주소를 받아 해당 지역(구 기준)의 후원가게리스트를 반환한다", response = List.class)
	@GetMapping("/supportstorelist/{Juso}")
	public ResponseEntity<List<List<SupportStore>>> listStore(@ApiParam(value = "후원가게 목록을 얻기 위한 기본 주소(ex:서울 종로구 종로54길 17-10, 서울 종로구 창신동 330-49)", required = true) @PathVariable String Juso) throws Exception {
		logger.info("listStore_Support - 호출");
		return new ResponseEntity<List<List<SupportStore>>	>(supportService.getSupportStoreList(Juso), HttpStatus.OK);
	}
	
	@ApiOperation(value = "가게 상세정보", notes = "storeId를 받아 해당 가게의 상세정보를 반환한다", response = StoreDetail.class)
	@GetMapping("/storedetail/{storeId}")
	public ResponseEntity<StoreDetail> storeDetail(@ApiParam(value = "storId", required = true) @PathVariable int storeId) throws Exception {
		logger.info("storeDetail_Support - 호출");
		return new ResponseEntity<StoreDetail>(supportService.getStoreDetail(storeId), HttpStatus.OK);
	}
		
	@ApiOperation(value = "가게 메뉴정보", notes = "storeId를 받아 해당 가게의 메뉴를 반환한다", response = List.class)
	@GetMapping("/menulist/{storeId}")
	public ResponseEntity<List<Menu>> menuList(@ApiParam(value = "storeId", required = true) @PathVariable int storeId) throws Exception {
		logger.info("menuList_Support - 호출");
		return new ResponseEntity<List<Menu>>(supportService.getMenuList(storeId), HttpStatus.OK);
	}
	
}
	