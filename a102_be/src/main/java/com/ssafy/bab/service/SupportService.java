package com.ssafy.bab.service;

import java.text.ParseException;
import java.util.List;

import javax.persistence.EntityManager;

import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.SupportStore;

public interface SupportService {

	//가게 리스트
	public List<List<SupportStore>> getSupportStoreList(String Juso) throws Exception;
	
	//가게 상세 정보
	public StoreDetail getStoreDetail(int storeId) throws Exception;
	
	//가게 메뉴 리스트
	public List<Menu> getMenuList(int storeId) throws Exception;
	
	public void updateContribution() throws ParseException;
	
}
