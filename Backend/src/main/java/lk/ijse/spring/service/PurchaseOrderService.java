package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;

import java.util.List;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/27/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
public interface PurchaseOrderService {
    void purchaseOrder(OrdersDTO dto);
    List<OrdersDTO> getAllOrders();
    List<OrderDetailsDTO> getAllOrderDetails();
}
