package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/26/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ModelMapper mapper;

    @Autowired
    ItemRepo itemRepo;

    @Override
    public void saveItem(ItemDTO dto) {
        if (!itemRepo.existsById(dto.getCode())){
            Item map = mapper.map(dto, Item.class);
            itemRepo.save(map);
        }else {
            throw new RuntimeException("Item Already Exist..!");
        }
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())){
            Item map = mapper.map(dto, Item.class);
            itemRepo.save(map);
        }else {
            throw new RuntimeException("No Such a Item..!");
        }
    }

    @Override
    public void deleteItem(String id) {
        if (itemRepo.existsById(id)){
            itemRepo.deleteById(id);
        }else {
            throw new RuntimeException("Please check the Item Code.. No Such Item..!");
        }
    }

    @Override
    public ItemDTO searchItem(String id) {
        return null;
    }

    @Override
    public List<ItemDTO> getAllItem() {
        return null;
    }
}
