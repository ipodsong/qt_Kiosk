package com.ssafy.bab.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ssafy.bab.controller.MainController;
import com.ssafy.bab.dao.ContributionDao;
import com.ssafy.bab.dao.ContributionOldDao;
import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.LocationDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dao.StoreVariablesDao;
import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.ContributionOld;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.Location;
import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.Store;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.SupportStore;

@Service
public class SupportServiceImpl implements SupportService {

	private static final Logger logger = LoggerFactory.getLogger(SupportServiceImpl.class);
	
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private LocationDao locationDao;
	
	@Autowired
	private StoreVariablesDao storeVariablesDao;
	
	@Autowired
	private ItemDao itemDao;
	
	@Autowired
	private ContributionDao contributionDao;
	
	@Autowired
	private ContributionOldDao contributionOldDao;
	
	@Override
	public List<List<SupportStore>> getSupportStoreList(String Juso) throws Exception {
		StringTokenizer st = new StringTokenizer(Juso);
		String si = null;
		String gu = null;
		if(st.hasMoreTokens()) {
			si = st.nextToken();
			if(st.hasMoreTokens()) {
				gu = st.nextToken();
			}else 
				return null;
		}else 
			return null;
		
		
		// 구를 기준으로 locationId를 받아온뒤 locationId와 후원유무(StoreKiosk)를 기준으로
		// store와 storeVariable을 리스트로 받아와서 StoreList에 결과를 추가 후 반환
		
		Location location = locationDao.findByLocationGu(gu);
		if(location == null) return null;
		
		ArrayList<Store> storeList = storeDao.findByLocation_locationIdAndStoreKiosk(location.getLocationId(), 1);
		if(storeList == null) return null;
		
		// 카테고리별로 list에 추가하고 카테고리별 리스트들을 resultList에 넣어 반환 
		ArrayList<List<SupportStore>> resultList = new ArrayList<>();
		List<SupportStore>[] categories = new ArrayList[10];

		for(int i = 0; i < 10; i++) {
			categories[i] = new ArrayList<SupportStore>();
		}

		
		for (Store store : storeList) {
			SupportStore result = new SupportStore();
			result.setStoreId(store.getStoreId());
			result.setStoreName(store.getStoreName());
			result.setStoreLocation(store.getStoreLocation());
			result.setStoreCategory(store.getStoreCategory());

			StoreVariables storeVariables = storeVariablesDao.findByStoreId(store.getStoreId());
			result.setStoreItemAvailable(storeVariables.getStoreItemAvailable());
			result.setStoreItemTotal(storeVariables.getStoreItemTotal());
			
			switch (store.getStoreCategory()) {
			case "한식":
				categories[1].add(result);
				break;
			case "양식":
				categories[2].add(result);
				break;
			case "제과점/카페":
				categories[3].add(result);
				break;
			case "기타":
				categories[4].add(result);
				break;
			case "중식":
				categories[5].add(result);
				break;
			case "마트/편의점":
				categories[6].add(result);
				break;
			case "패스트푸드":
				categories[7].add(result);
				break;
			case "일식":
				categories[8].add(result);
				break;
			case "치킨/피자":
				categories[9].add(result);
				break;
			default:
				break;
			}
			categories[0].add(result);
		}

		for(int i = 0; i < 10; i++) {
			resultList.add(categories[i]);
		}
		
		return resultList;
	}

	@Override
	public StoreDetail getStoreDetail(int storeId) throws Exception {
		StoreDetail storeDetail = new StoreDetail();
		Store store = storeDao.findByStoreId(storeId);
		storeDetail.setStoreId(storeId);
		storeDetail.setStoreName(store.getStoreName());
		storeDetail.setStoreCategory(store.getStoreCategory());
		storeDetail.setStoreLocation(store.getStoreLocation());
		storeDetail.setStorePhone(store.getStorePhone());
		storeDetail.setStoreContributionAmount(contributionDao.getTotalStoreContributionCount(storeId));
		return storeDetail;
	}

	@Override
	public List<Menu> getMenuList(int storeId) throws Exception {
		ArrayList<Menu> menuList = new ArrayList<Menu>();
		ArrayList<Item> itemList = itemDao.findByStoreId(storeId);
		for (Item item : itemList) {
			Menu menu = new Menu();
			menu.setStoreId(storeId);
			menu.setItemId(item.getItemId());
			menu.setItemName(item.getItemName());
			menu.setItemPrice(item.getItemPrice());
			menu.setItemAvailable(item.getItemAvailable());
			menu.setItemContributionAmount(contributionDao.getTotalItemContributionCount(storeId, item.getItemId()));
			menu.setItemImgUrl(item.getItemImgUrl());
			
			menuList.add(menu);
		}
		return menuList;
	}
	
	// 매일 새벽 4시에 3개월이 지난 후원내역들을 contribution -> contribution_old로 옮긴다
	@Override
	@Scheduled(cron = "0 0 4 * * ?", zone = "Asia/Seoul")
	public void updateContribution() throws ParseException {

		logger.info("updateContribution - 호출");
		
		DateFormat format = new SimpleDateFormat("yyyyMMdd");
		String date = format.format(new Date());
		Date ContributionDate = format.parse(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(ContributionDate);
		cal.add(Calendar.MONTH, -3);

		
		ArrayList<Contribution> list = contributionDao.findByContributionDateLessThan(cal.getTime());
		
		for (Contribution contribution : list) {
			
			ContributionOld contributionOld = new ContributionOld();

			contributionOld.setContributionId(contribution.getContributionId());
			contributionOld.setStoreId(contribution.getStoreId());
			contributionOld.setItemId(contribution.getItemId());
			contributionOld.setUser(contribution.getUser());
			contributionOld.setContributor(contribution.getContributor());
			contributionOld.setContributionMessage(contribution.getContributionMessage());
			contributionOld.setContributionAnswer(contribution.getContributionAnswer());
			contributionOld.setContributionDate(contribution.getContributionDate());
			contributionOld.setContributionDateUsed(contribution.getContributionDateUsed());
			contributionOld.setContributionUse(contribution.getContributionUse());
			contributionOld.setPayment(contribution.getPayment());
			
			contributionOldDao.save(contributionOld);
			contributionDao.delete(contribution);
			
		}
		
	}

}
