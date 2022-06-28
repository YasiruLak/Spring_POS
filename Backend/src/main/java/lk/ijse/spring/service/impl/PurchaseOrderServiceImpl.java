package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/27/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    OrderDetailsRepo orderDetailsRepo;

    @Autowired
    ItemRepo itemRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void purchaseOrder(OrdersDTO dto) {

    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return null;
    }

    @Override
    public List<OrderDetailsDTO> getAllOrderDetails() {
        return null;
    }
}
