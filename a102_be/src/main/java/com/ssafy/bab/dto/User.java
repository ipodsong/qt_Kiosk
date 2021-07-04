package com.ssafy.bab.dto;


import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.ssafy.bab.component.StringCryptoConverter;

import lombok.Data;

@Data
@Entity
@Table(name="user")
public class User implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO는 default로, IDENTITY는 Auto-increment
	private Integer userSeq;
	
	private String userId;	
	private String userName;
	
	private String userPwd;
	
	@Convert(converter = StringCryptoConverter.class)
	private String userEmail;
	
	@Convert(converter = StringCryptoConverter.class)
	@Column(name="user_phone", nullable = true)
	private String userPhone;
	
	private LocalDateTime userDate = LocalDateTime.now();
	
	@PrePersist
    public void createdAt() {
		this.userDate = LocalDateTime.now();
    }
	
	private int userTotalContributionAmount;
	private int userTotalContributionCount;

	@ManyToOne
	@JoinColumn(name="store_id", nullable = true)
	private Store store;
	
	
}
