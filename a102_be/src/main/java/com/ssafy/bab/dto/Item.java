package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@IdClass(ItemPK.class)
@Table(name="item")
public class Item implements Serializable{
	@Id
	@Column(name = "store_id")
	private Integer storeId;
	
	
//	@ManyToOne
//	@JoinColumn(name="store_id", insertable = false, updatable = false)
//	private Store store;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private int itemId;
	
	
	private String itemName;
	private Integer itemPrice;
	@Column(nullable = true)
	private Integer supportPrice;
	private int itemAvailable;
	private int itemTotal;
	private String ItemImgUrl;
	
	
}
