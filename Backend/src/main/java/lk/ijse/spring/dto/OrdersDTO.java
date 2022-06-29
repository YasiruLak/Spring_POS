package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

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
public class OrdersDTO {

    private String oId;
    private CustomerDTO customer;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private double total;
    private double discount;
    private double subTotal;
    List<OrderDetailsDTO> orderDetails;
}
