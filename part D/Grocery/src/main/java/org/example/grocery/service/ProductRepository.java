package org.example.grocery.service;

import jdk.jfr.Registered;
import org.example.grocery.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
@Registered
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByNameAndSupplierId(String name, Long supplierId);
}
