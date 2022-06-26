package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/26/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
public interface ItemService {
    void saveItem(ItemDTO dto);
    void updateItem(ItemDTO dto);
    void deleteItem(String id);
    ItemDTO searchItem(String id);
    List<ItemDTO> getAllItem();
}
