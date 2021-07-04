package com.ssafy.bab.service;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.bab.dto.AllStore;
import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.StoreList;
import com.ssafy.bab.dto.StoreRank;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserRank;

public interface MainService {

	//가게 리스트
	public List<List<AllStore>> getStoreList(String Juso) throws Exception;
		
	//전체 랭킹+정보
	public List<StoreRank> storeTotalRank() throws Exception;
		
	//지역별 랭킹+정보
	public List<StoreRank> storeRegionalRank(int locationId) throws Exception;
		
	//유저랭킹
	public List<User> userTotalRank();

	//유저 토탈
	public Integer userTotal();
	
	//유저 그릇 랭킹
	public List<UserRank> userBowlRank();
	
}
