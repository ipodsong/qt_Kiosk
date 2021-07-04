package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.Payment;

public interface PaymentDao extends JpaRepository<Payment, String> {

}
