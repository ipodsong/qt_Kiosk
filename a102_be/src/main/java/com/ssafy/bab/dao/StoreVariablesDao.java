package com.ssafy.bab.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.bab.dto.StoreVariables;

public interface StoreVariablesDao extends JpaRepository<StoreVariables, Integer> {
	
	StoreVariables findByStoreId(int storeId);
	
	List<StoreVariables> findAllByOrderByStoreTotalContributionAmountDesc();
	
	// 총 후원금액
	@Query(value = "SELECT sum(store_total_contribution_amount) from store_variables;", nativeQuery = true)
	Integer selectSumTotalContributionAmount();
}
