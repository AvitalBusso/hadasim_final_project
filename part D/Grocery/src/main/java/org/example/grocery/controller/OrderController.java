package org.example.grocery.controller;

import org.example.grocery.model.EStatus;
import org.example.grocery.model.Order;
import org.example.grocery.model.Supplier;
import org.example.grocery.service.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("addOrder")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        order.setStatus(EStatus.PENDING);
        order.setDateTime(LocalDateTime.now());
        Order savesOrder = orderRepository.save(order);
        return new ResponseEntity<>(savesOrder, HttpStatus.CREATED);//201
    }

    @GetMapping("/getOrdersBySupplierId/{id}")
    public ResponseEntity<List<Order>> getOrdersBySupplierId(@PathVariable Long id) {
        List<Order> orders = orderRepository.findBySupplierId(id);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/updateStatusToProcess/{id}")
    public ResponseEntity<Order> updateStatusToProcess(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        order.setStatus(EStatus.IN_PROCESS);
        orderRepository.save(order);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/updateStatusToCompleted/{id}")
    public ResponseEntity<Order> updateStatusToCompleted(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        order.setStatus(EStatus.COMPLETED);
        orderRepository.save(order);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
