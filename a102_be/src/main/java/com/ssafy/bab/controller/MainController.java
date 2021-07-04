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

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.AllStore;
import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.StoreRank;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserRank;
import com.ssafy.bab.service.MainService;
import com.ssafy.bab.service.SupportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("MainController V1")
@RestController
@RequestMapping("/main")
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private MainService mainService;
	
	@Autowired
	private SupportService supportService;
	
	@Autowired
	private MainService userRankService;
	
	@Autowired
	private UserDao userDao;
	
	@ApiOperation(value = "가게 목록", notes = "주소를 받아 해당 지역(동 기준)의 가게리스트를 반환한다", response = List.class)
	@GetMapping("/mapview/storelist/{Juso}")
	public ResponseEntity<List<List<AllStore>>> listStore(@ApiParam(value = "가게 목록을 얻기 위한 기본 주소(ex:서울 종로구 종로54길 17-10, 서울 종로구 창신동 330-49)", required = true) @PathVariable String Juso) throws Exception {
		logger.info("listStore - 호출");
		return new ResponseEntity<List<List<AllStore>>>(mainService.getStoreList(Juso), HttpStatus.OK);
	}
	
	@ApiOperation(value = "가게 상세정보", notes = "storeId를 받아 해당 가게의 상세정보를 반환한다", response = StoreDetail.class)
	@GetMapping("/storedetail/{storeId}")
	public ResponseEntity<StoreDetail> storeDetail(@ApiParam(value = "storId", required = true) @PathVariable int storeId) throws Exception {
		logger.info("storeDetail_Main - 호출");
		return new ResponseEntity<StoreDetail>(supportService.getStoreDetail(storeId), HttpStatus.OK);
	}
		
	@ApiOperation(value = "가게 메뉴정보", notes = "storeId를 받아 해당 가게의 메뉴를 반환한다", response = List.class)
	@GetMapping("/menulist/{storeId}")
	public ResponseEntity<List<Menu>> menuList(@ApiParam(value = "storeId", required = true) @PathVariable int storeId) throws Exception {
		logger.info("menuList_Main - 호출");
		return new ResponseEntity<List<Menu>>(supportService.getMenuList(storeId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 랭킹", notes = "전체 가게별 후원랭킹", response = List.class)
	@GetMapping("/storetotal")
	public ResponseEntity<List<StoreRank>> storeTotalRank() throws Exception{
		List<StoreRank> storeTotalRank = mainService.storeTotalRank();
		//System.out.println("In controller"+storeTotalRank);
		return new ResponseEntity<List<StoreRank>>(storeTotalRank, HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "지역 랭킹", notes = "지역별 후원랭킹", response = List.class)
	@GetMapping("/storetotal/{locationId}")
	public ResponseEntity<List<StoreRank>> storeRegionalRank(@PathVariable int locationId) throws Exception{
		List<StoreRank> storeRegionalRank = mainService.storeRegionalRank(locationId);
		//System.out.println("In controller"+storeRegionalRank);
		return new ResponseEntity<List<StoreRank>>(storeRegionalRank, HttpStatus.OK);
	}
	
	@ApiOperation(value = "유저 랭킹", notes = "유저별 후원랭킹 확인", response = List.class)
	@GetMapping("/userrank")
	public ResponseEntity<List<User>> userTotalRank(){
		List<User> userTotalRankList = userRankService.userTotalRank();
		System.out.println("In controller"+userTotalRankList);
		return new ResponseEntity<List<User>>(userTotalRankList, HttpStatus.OK);
	}
	
	
	
	//유저 후원 총 금액
	@GetMapping("/usertotal")
	public ResponseEntity<Integer> userTotal(){
		int userTotal = userRankService.userTotal();
		return new ResponseEntity<Integer>(userTotal, HttpStatus.OK);
	}
	
	//유저 그릇 랭킹
	@ApiOperation(value = "유저 그릇 랭킹", notes = "유저별 후원 그릇 수 랭킹 확인", response = List.class)
	@GetMapping("/userrankbowl")
	public ResponseEntity<List<UserRank>> userRankBowl(){
		List<UserRank> userRankBowl = mainService.userBowlRank();
		return new ResponseEntity<List<UserRank>>(userRankBowl, HttpStatus.OK);
	}
}
	