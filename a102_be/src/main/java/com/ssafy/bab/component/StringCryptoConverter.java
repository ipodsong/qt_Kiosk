package com.ssafy.bab.component;

import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Convert;

import org.springframework.beans.factory.annotation.Value;

@Convert
public class StringCryptoConverter implements AttributeConverter<String, String> {

	@Value("${CRYPTO_KEY}")
	private String KEY;
	
	@Value("${ALGORITHM}")
	private String ALGORITHM; 

	
	@Override
	public String convertToDatabaseColumn(String attribute) {
		Key key = new SecretKeySpec(KEY.getBytes(), "AES"); 
		try { 
			Cipher cipher = Cipher.getInstance(ALGORITHM); 
			cipher.init(Cipher.ENCRYPT_MODE, key); 
			return new String(Base64.getEncoder().encode(cipher.doFinal(attribute.getBytes()))); 
			} catch (Exception e) { 
				throw new RuntimeException(e); 
		}

		
	}

	@Override
	public String convertToEntityAttribute(String dbData) {
		Key key = new SecretKeySpec(KEY.getBytes(), "AES"); 
		try { 
			Cipher cipher = Cipher.getInstance(ALGORITHM); 
			cipher.init(Cipher.DECRYPT_MODE, key); 
			return new String(cipher.doFinal(Base64.getDecoder().decode(dbData))); 
		} catch (Exception e) { 
			throw new RuntimeException(e); 
		}
	}

}
