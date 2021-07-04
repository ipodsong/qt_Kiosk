package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.OrderIdAndPaymentId;
import com.ssafy.bab.dto.Orders;
import com.ssafy.bab.dto.OrdersPK;

@Repository
public interface OrderDao extends JpaRepository<Orders, OrdersPK>  {
	@Query(value = "SELECT MAX(order_id) + 1 partner_order_id FROM sys.order", nativeQuery = true)
	int getPartnerOrderId();
	
	// 주문완료되지 않은 payment_id 가져오기
	@Query(value = "SELECT distinct(payment_id) as paymentId, min(order_id) as orderId FROM sys.orders WHERE order_done IS NULL AND payment_id IS NOT NULL GROUP BY payment_id", nativeQuery = true)
	ArrayList<OrderIdAndPaymentId> getNotOrderDonePaymentId();
	
	// 주문완료되지 않은 payment_gdream_id 가져오기
	@Query(value = "SELECT distinct(payment_gdream_id) as paymentId, min(order_id) as orderId FROM sys.orders WHERE order_done IS NULL AND payment_gdream_id IS NOT NULL GROUP BY payment_gdream_id", nativeQuery = true)
	ArrayList<OrderIdAndPaymentId> getNotOrderDonePaymentGdreamId();
	
	// 동일한 paymentGdreamId를 갖는 주문내역 가져오기
	ArrayList<Orders> findByPaymentGdream_paymentGdreamId(String paymentGdreamId);
	
	// 동일한 paymentId를 갖는 주문내역 가져오기
	ArrayList<Orders> findByPayment_PaymentId(String paymentId);
}
