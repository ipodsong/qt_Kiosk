package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.Store;


public interface StoreDao extends JpaRepository<Store, Integer> {
	ArrayList<Store> findByLocation_locationId(int locationId);
	ArrayList<Store> findByLocation_locationIdAndStoreKiosk(int LocationId, int StoreKiosk);
	
	Store findByStoreId(int StoreId);
}
