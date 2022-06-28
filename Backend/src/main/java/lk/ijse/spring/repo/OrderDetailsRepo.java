package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/27/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
public interface OrderDetailsRepo extends JpaRepository<OrderDetails,String> {
}
