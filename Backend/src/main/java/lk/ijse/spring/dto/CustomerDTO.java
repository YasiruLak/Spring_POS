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
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomerDTO {

    private String id;
    private String name;
    private String address;
    private String contact;
}
