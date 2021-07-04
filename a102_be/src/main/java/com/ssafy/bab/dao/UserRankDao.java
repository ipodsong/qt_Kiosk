package com.ssafy.bab.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserCount;

@Repository
public interface UserRankDao extends JpaRepository<User, Integer> {
	//유저 개인 순위(금액)
	List<User> findByUserTotalContributionAmountGreaterThanOrderByUserTotalContributionAmountDesc(int userTotalContributionAmount);
	
	//유저 개인 순위(그릇수)
	ArrayList<User> findByUserTotalContributionCountGreaterThanOrderByUserTotalContributionCountDesc(int userTotalContributionCount);
	
	//총 후원금액
	@Query(value = "SELECT sum(user_total_contribution_amount) from user;", nativeQuery = true)
	Integer selectSumUserTotalContributionAmountFromUser();
	
	//후원횟수
	@Query(value = "SELECT user_seq as userSeq, count(user_seq) as count from contribution group by user_seq having user_seq is not null order by count(user_seq) desc;", nativeQuery = true)
	List<UserCount> selectCountFromContributionGroupByUserSeqOrderByCountDesc();
}
