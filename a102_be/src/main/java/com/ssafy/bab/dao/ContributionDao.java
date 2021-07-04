package com.ssafy.bab.dao;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.ItemIdCount;

@Repository
public interface ContributionDao extends JpaRepository<Contribution, Integer> {

	// 가게의 메뉴별 일정 기간 내 (한달) 후원 횟수
	@Query(value = "SELECT COUNT(item_id) FROM contribution WHERE DATE_FORMAT(contribution_date, '%Y-%m-%d') >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND store_id = :storeId AND item_id = :itemId", nativeQuery = true)
	int getTotalItemContributionCount(@Param("storeId") int storeId,@Param("itemId")  int itemId);
	
	// 가게의 일정 기간 내 (한달) 후원 횟수
	@Query(value = "SELECT COUNT(store_id) FROM contribution WHERE DATE_FORMAT(contribution_date, '%Y-%m-%d') >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND store_id = :storeId", nativeQuery = true)
	int getTotalStoreContributionCount(@Param("storeId") int storeId);

	ArrayList<Contribution> findByUser_UserSeqOrderByContributionDateDesc(int userSeq);
	
	//개인 후원횟수
	@Query(value = "select count(user_seq) from contribution group by user_seq having user_seq = :userSeq", nativeQuery = true)
	Integer findCountByUserSeq(@Param("userSeq") int userSeq);
	
	// 일정 기간이 넘은 후원내역
	@Query(value = "SELECT contribution_id FROM contribution WHERE DATE_SUB(CURDATE(), INTERVAL 3 MONTH) >= DATE_FORMAT(contribution_date, '%Y-%m-%d');", nativeQuery = true)
	ArrayList<Integer> getContributionOlds();
	
	ArrayList<Contribution> findByContributionDateLessThan(Date contributionDate);
	
	// 메뉴별 후원횟수
	@Query(value = "SELECT item_id as itemId, COUNT(item_id) as count FROM contribution WHERE store_id = :storeId AND :endDate >= contribution_date AND contribution_date >= :startDate group by item_id; ", nativeQuery = true)
	ArrayList<ItemIdCount> getItemContributionCount(@Param("storeId") int storeId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

	// 사용되지 않은 특정 메뉴 후원내역
	ArrayList<Contribution> findByStoreIdAndItemIdAndContributionUseOrderByContributionDate(int storeId, int itemId, int contributionUse);
	
	// 비회원 후원 가져오기
	ArrayList<Contribution> findByContributor_ContributorSeq(int contributorSeq);
	
	// 동일한 paymentGdreamId를 갖는 후원내역 가져오기
	ArrayList<Contribution> findByPaymentGdream_paymentGdreamId(String paymentGdreamId);
	
	Contribution findByContributionId(int contributionId);
	
	@Query(value = "SELECT max(contribution_id) as maxContributionId FROM sys.contribution WHERE user_seq IS NOT NULL AND contribution_use = 0 GROUP BY user_seq", nativeQuery = true)
	ArrayList<Integer> getMaxContributionId();

}
