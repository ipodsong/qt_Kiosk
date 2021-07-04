package com.ssafy.bab.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ssafy.bab.dto.User;

public interface UserDao extends CrudRepository<User, Integer> {
	User findByUserSeq(int userSeq);
	
	User findByUserId(String userId);
	User findByUserEmail(String userEmail);
	User findByUserPhone(String userPhone);
	
}
