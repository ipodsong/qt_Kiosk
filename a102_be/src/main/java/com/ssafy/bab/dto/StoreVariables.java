package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="store_variables")
public class StoreVariables implements Serializable{
	
	@Id
	private int storeId;
	
	private int storeItemAvailable;
	private int storeItemTotal;
	private int storeTotalContributionAmount;
	private int storeSettlementDay;
	
	//단방향 매핑
//	@OneToOne
//	@JoinColumn(name = "store_id", insertable = false, updatable = false)
//	private Store store;
}
