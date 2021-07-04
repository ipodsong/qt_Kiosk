package com.ssafy.bab.dto;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.bab.component.StringCryptoConverter;

import lombok.Data;

@Data
@Entity
@Table(name="card_rfid")
public class CardRfid {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cardSeq;
	
	@Convert(converter = StringCryptoConverter.class)
	private String cardNumber;
	
	private String cardType;
	
}
