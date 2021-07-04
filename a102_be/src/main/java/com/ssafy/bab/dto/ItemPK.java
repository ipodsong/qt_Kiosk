package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Column;

import lombok.Data;

@Data
public class ItemPK implements Serializable{

	@Column
	private int storeId;	// Item.store 매핑
	@Column
	private int itemId;		// Item.itemId 매핑
	
	
}
