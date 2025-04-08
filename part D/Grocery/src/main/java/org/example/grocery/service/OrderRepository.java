package org.example.grocery.service;

import org.example.grocery.model.EStatus;
import org.example.grocery.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findBySupplierId(Long supplierId);
}
