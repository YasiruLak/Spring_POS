package lk.ijse.spring.controller;

import lk.ijse.spring.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Yasiru Dahanayaka
 * @name : Spring_POS
 * @date : 6/26/2022
 * @month : 06
 * @year : 2022
 * @since : 0.1.0
 **/
@RestController
@RequestMapping("api/v1/item")
@CrossOrigin
public class ItemController {

    @Autowired
    ItemService itemService;
}
