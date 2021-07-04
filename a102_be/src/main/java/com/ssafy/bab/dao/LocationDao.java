package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.Location;

public interface LocationDao extends JpaRepository<Location, Integer> {
	Location findByLocationGu(String locationGu);
}
