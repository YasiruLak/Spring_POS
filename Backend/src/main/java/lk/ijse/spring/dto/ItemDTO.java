package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/26/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ItemDTO {

    private String code;
    private String name;
    private int qty;
    private double price;
}
