package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="location")
public class Location implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int locationId;
	private String locationSi;
	private String locationGu;
}
