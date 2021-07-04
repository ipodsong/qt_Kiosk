package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.ItemPK;

public interface ItemDao extends JpaRepository<Item, ItemPK> {

	ArrayList<Item> findByStoreId(int storeId);
//	Item findByItemIdAndStore_StoreId(int itemId, int storeId);
//	Item findByStore_StoreIdAndItemId(int itemId, int storeId);
	Item findByItemIdAndStoreId(int itemId, int storeId);
	
	@Query(value = "SELECT MAX(item_id) + 1 from item WHERE store_id = :storeId", nativeQuery = true)
	Integer getMaxItemId(@Param("storeId") int storeId);
	
}
