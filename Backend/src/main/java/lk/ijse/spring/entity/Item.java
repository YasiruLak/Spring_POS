package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/26/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Item implements SuperEntity{

    @Id
    private String code;
    private String name;
    private int qty;
    private double price;
}
