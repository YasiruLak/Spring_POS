package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ItemDTO;
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

    }

    @Override
    public void updateItem(ItemDTO dto) {

    }

    @Override
    public void deleteItem(String id) {

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
