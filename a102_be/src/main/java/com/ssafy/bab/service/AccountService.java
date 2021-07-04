package com.ssafy.bab.service;

import java.util.ArrayList;

import com.ssafy.bab.dto.ContributionResult;
import com.ssafy.bab.dto.User;


public interface AccountService {
	
	public User signUp(User user) ;
	
	public User signIn(String userId, String userPwd);
	
	public User userInfo(int userSeq);
	
	public int userWithUs(int userSeq);
	
	public User userInfoById(String userId);
	
	public User signInNaver(String Authorization);
	
	public String userPwdChk(User user, String pwd);
	
	// 유저 정보 업데이트
	public String userUpdate(User user, User newUser);
	
	// 비회원 후원내역 연동
	public void getContributorHistory(User user);
	
	//프로필
	public ArrayList<ContributionResult> userContribution(int userSeq);
	
	public int userContributionCount(int userSeq);
	
}
