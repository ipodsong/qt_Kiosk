package com.ssafy.bab.dto;

import java.io.Serializable;

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
@Table(name="contributor")
public class Contributor implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contributorSeq;
	
	@Convert(converter = StringCryptoConverter.class)
	private String contributorPhone;
}
