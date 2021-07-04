package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Column;

public class OrdersPK implements Serializable {
	private int itemId;
	private int storeId;
	@Column
	private int orderId;
}
