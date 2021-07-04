package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name="payment")
public class Payment {
	@Id
	private String paymentId;
	private int paymentAmount;
	@Temporal(TemporalType.TIMESTAMP)
	private Date paymentDate; 
	
	@JoinColumn(name="kakaopay_tid", nullable = true)
	private String kakaopayTid;
	
	@JoinColumn(name="kakaopay_cid", nullable = true)
	private String kakaopayCid;
	
	@JoinColumn(name="naverpay_payment_id", nullable = true)
	private String naverpayPaymentId;
	
	@JoinColumn(name="naverpay_merchant_id", nullable = true)
	private String naverpayMerchantId;
	
	@JoinColumn(name="imp_uid", nullable = true)
	private String impUid;
	
	@JoinColumn(name="imp_merchant_id", nullable = true)
	private String impMerchantId;
	
	@JoinColumn(name="credit_approval_number", nullable = true)
	private String creditApprovalNumber;
	
	@JoinColumn(name="credit_store_id", nullable = true)
	private Integer creditStoreId;
}
