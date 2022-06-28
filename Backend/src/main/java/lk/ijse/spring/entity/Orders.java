package lk.ijse.spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.spring.dto.OrderDetailsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
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
@Entity
@ToString
public class Orders implements SuperEntity{

    @Id
    private String orderId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private double total;
    private double discount;
    private double subTotal;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customerId",referencedColumnName = "id",nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "orders",cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;
}
