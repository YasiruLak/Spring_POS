package lk.ijse.spring.dto;

import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/27/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDetailsDTO {

    private String oId;
    private String iCode;
    private int qty;
    private double unitPrice;
    private double total;
}
