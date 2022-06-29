package lk.ijse.spring.controller;

import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/27/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@RestController
@RequestMapping("api/v1/purchase_Orders")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService purchaseOrderService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrdersDTO ordersDTO){
        purchaseOrderService.purchaseOrder(ordersDTO);
        return new ResponseUtil(200,"Saved",null);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders() {
        return new ResponseUtil(200, "Ok", purchaseOrderService.getAllOrders());
    }

//    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil getAllOrderDetails() {
//        return new ResponseUtil(200, "Ok", purchaseOrderService.getAllOrders());
//    }
}
