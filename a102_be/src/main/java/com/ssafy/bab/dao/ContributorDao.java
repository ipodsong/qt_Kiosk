package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Contributor;

@Repository
public interface ContributorDao extends JpaRepository<Contributor, Integer>{
	Contributor findByContributorPhone(String contributorPhone);
}
