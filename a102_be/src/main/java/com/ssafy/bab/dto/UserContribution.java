package com.ssafy.bab.dto;

import java.io.Serializable;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserContribution  implements Serializable{
	
	private int userWithUs;
	private int contributionCount;
	private int contributionTotal;
}
