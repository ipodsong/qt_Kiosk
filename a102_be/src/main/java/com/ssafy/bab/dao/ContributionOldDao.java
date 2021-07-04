package com.ssafy.bab.dao;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.ContributionOld;
import com.ssafy.bab.dto.ItemIdCount;

@Repository
public interface ContributionOldDao extends JpaRepository<ContributionOld, Integer> {
	@Query(value = "SELECT item_id as itemId, COUNT(item_id) as count FROM contribution_old WHERE store_id = :storeId AND :endDate >= contribution_date AND contribution_date >= :startDate group by item_id; ", nativeQuery = true)
	ArrayList<ItemIdCount> getItemContributionCount(@Param("storeId") int storeId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

	ArrayList<ContributionOld> findByContributor_ContributorSeq(int contributorSeq);
	
	// 사용되지 않은 특정 메뉴 후원내역
	ArrayList<ContributionOld> findByStoreIdAndItemIdAndContributionUseOrderByContributionDate(int storeId, int itemId, int contributionUse);

	// 동일한 paymentGdreamId를 갖는 후원내역 가져오기
	ArrayList<ContributionOld> findByPaymentGdream_paymentGdreamId(String paymentGdreamId);

}
