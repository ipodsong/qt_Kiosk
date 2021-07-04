package com.ssafy.bab.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.ssafy.bab.dao.ContributionDao;
import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.LocationDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dao.StoreVariablesDao;
import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dao.UserRankDao;
import com.ssafy.bab.dto.AllStore;
import com.ssafy.bab.dto.Location;
import com.ssafy.bab.dto.Store;
import com.ssafy.bab.dto.StoreRank;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserRank;

@Service
public class MainServiceImpl implements MainService {

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
	private UserDao userDao;
	
	//유저랭킹
	@Autowired
	UserRankDao userRankDao;
	
	@Override
	public List<List<AllStore>> getStoreList(String Juso) throws Exception {
		StringTokenizer st = new StringTokenizer(Juso);
//		Juso = st.nextToken() + " " + st.nextToken() + " " + st.nextToken();
//		st = new StringTokenizer(getJibun(Juso));
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
		
		
		
		// 구를 기준으로 locationId를 받아온뒤 locationId를 기준으로 store를 리스트로 받아온다
		Location location = locationDao.findByLocationGu(gu);
		if(location == null) return null;
		
		ArrayList<Store> storeList = storeDao.findByLocation_locationId(location.getLocationId());
		if(storeList == null) return null;
		
		// 카테고리별로 list에 추가하고 카테고리별 리스트들을 resultList에 넣어 반환 
		ArrayList<List<AllStore>> resultList = new ArrayList<>();
		List<AllStore>[] categories = new ArrayList[10];

		for(int i = 0; i < 10; i++) {
			categories[i] = new ArrayList<AllStore>();
		}
		
		for (Store store : storeList) {
			AllStore result = new AllStore();
			result.setStoreId(store.getStoreId());
			result.setStoreName(store.getStoreName());
			result.setStoreLocation(store.getStoreLocation());
			result.setStoreCategory(store.getStoreCategory());
			result.setStoreKiosk(store.getStoreKiosk());
			if(store.getStoreKiosk() == 1) {
				StoreVariables storeVariables = storeVariablesDao.findByStoreId(store.getStoreId());
				if(storeVariables == null) {
					return null;
				}
				result.setStoreItemAvailable(storeVariables.getStoreItemAvailable());
			}
			
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
	
	
	// 서울 종로구 종로54길 17-10, 서울 종로구 창신동 330-49 등으로 호수, 층과 같은 세부주소를 뺀 값을
	// street으로 넘겨주면 지번 주소를 반환
	
	String getJibun(String street) throws IOException, ParserConfigurationException, SAXException {
    	StringBuilder urlBuilder = new StringBuilder("http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdSearchAllService/retrieveNewAdressAreaCdSearchAllService/getNewAddressListAreaCdSearchAll"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=NWwLc8BoQWkfXREbESA%2F8XPOYnb7gmo64sRfxbd1I0xidhJ93VX5I4lmQyTxXjHr7SzF1KM4P3MMZwgXRO5Mow%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("srchwrd","UTF-8") + "=" + URLEncoder.encode(street, "UTF-8")); /*검색어*/
        urlBuilder.append("&" + URLEncoder.encode("countPerPage","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*페이지당 출력될 개수를 지정(최대50)*/
        urlBuilder.append("&" + URLEncoder.encode("currentPage","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*출력될 페이지 번호*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
//        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line + "\n");
        }
        rd.close();
        conn.disconnect();
        
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
        
        //*****************************************************
        Document document     =  builder.parse(new InputSource(new StringReader(sb.toString())));
        //여기가 핵심 *******************************************
        
        NodeList nodelist     =  document.getElementsByTagName("rnAdres");
        //태그 (< >)의 이름으로 불러오는 내용
        
        //nodelist의 크기를 구하려면 getLength()라는 메소드가 있음
        
		Node node = (Node) nodelist.item(0);// 첫번째 element 얻기
		Node textNode = null;
		if(node != null) {
				textNode = (Node) nodelist.item(0).getChildNodes().item(0);
				return textNode.getNodeValue();
		}
        //element의 text 얻기
        
//        System.out.println(textNode.getNodeValue());
		return null;
    }
	
	
	//유저랭킹
	public List<User> userTotalRank() {
		List<User> userTotalRankList 
		= userRankDao.findByUserTotalContributionAmountGreaterThanOrderByUserTotalContributionAmountDesc(0);
		System.out.println("In service"+userTotalRankList);
		return userTotalRankList;
	}
	
	
	//전체랭킹+정보
	@Override
	public List<StoreRank> storeTotalRank() throws Exception{
		//스토어정보+스토어현황정보
		List<StoreRank> storeTotalRank = new ArrayList<>();
		StoreRank storeRank;
		Store nowStore;
		int nowStoreId;
		List<StoreVariables> storeVariablesList = storeVariablesDao.findAllByOrderByStoreTotalContributionAmountDesc();

		for(int i=0;i<storeVariablesList.size();i++) {
			storeRank = new StoreRank();
			nowStoreId = storeVariablesList.get(i).getStoreId();
			storeRank.setStoreId(nowStoreId);
			storeRank.setStoreItemAvailable((storeVariablesList.get(i).getStoreItemAvailable()));
			storeRank.setStoreTotalContributionAmount((storeVariablesList.get(i).getStoreTotalContributionAmount()));
			storeRank.setStoreItemTotal((storeVariablesList.get(i).getStoreItemTotal()));
			
			nowStore = storeDao.findByStoreId(nowStoreId);
			storeRank.setStoreName(nowStore.getStoreName());
			storeRank.setStoreLocation(nowStore.getStoreLocation());
			storeRank.setStoreCategory(nowStore.getStoreCategory());
			storeRank.setStoreKiosk(nowStore.getStoreKiosk());
			storeRank.setLocationId(nowStore.getLocation().getLocationId());
			
			storeTotalRank.add(storeRank);
		}
		return storeTotalRank;
	}
	
	//지역별랭킹+정보
	@Override
	public List<StoreRank> storeRegionalRank(int locationId) throws Exception{
		//스토어정보+스토어현황정보
		List<StoreRank> storeTotalRank = storeTotalRank();
		List<StoreRank> storeRegionalRank = new ArrayList<>();
		for(int i=0;i<storeTotalRank.size();i++) {
			if(locationId == storeTotalRank.get(i).getLocationId()) {
				storeRegionalRank.add(storeTotalRank.get(i));
			}
		}
		return storeRegionalRank;
	}
	@Override
	public Integer userTotal() {
//		int userTotal = userRankDao.selectSumUserTotalContributionAmountFromUser();
		int userTotal = storeVariablesDao.selectSumTotalContributionAmount();
		return userTotal;
	}


	@Override
	public List<UserRank> userBowlRank() {
		List<UserRank> result = new ArrayList<UserRank>(); 
		List<User> userList = userRankDao.findByUserTotalContributionCountGreaterThanOrderByUserTotalContributionCountDesc(0);
		for(int i = 0; i < 10 && i < userList.size(); i++) {
			UserRank userRank = new UserRank();
			userRank.setUserTotalContributionCount(userList.get(i).getUserTotalContributionCount());
			userRank.setUserName(userList.get(i).getUserName());
			result.add(userRank);
		}
		return result;
	}
}
