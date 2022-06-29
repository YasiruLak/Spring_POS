package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/28/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItem_PK implements Serializable {

    private String oId;
    private String iCode;
}
