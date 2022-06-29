package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void purchaseOrder(OrdersDTO dto) {
        Orders order = mapper.map(dto, Orders.class);
        System.out.println(order.toString());

        if (!ordersRepo.existsById(order.getOId())) {
            ordersRepo.save(order);

            if (!order.getOrderDetails().isEmpty()) {
                for (OrderDetails orderDetail : order.getOrderDetails()) {
                    Item item = itemRepo.findById(orderDetail.getICode()).get();
                    item.setQty(item.getQty() - orderDetail.getQty());
                    itemRepo.save(item);
                }
            } else {
                throw new RuntimeException("No items added for the order..!");
            }

        } else {
            throw new RuntimeException("Purchase Order Failed..!, Order ID " + dto.getOId() + " Already Exist.!");

        }
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return mapper.map(ordersRepo.findAll(), new TypeToken<List<OrdersDTO>>() {
        }.getType());
    }

    @Override
    public List<OrderDetailsDTO> getAllOrderDetails() {
        return mapper.map(orderDetailsRepo.findAll(), new TypeToken<List<OrderDetailsDTO>>() {
        }.getType());
    }
}
