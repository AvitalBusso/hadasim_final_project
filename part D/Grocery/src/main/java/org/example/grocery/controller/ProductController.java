package org.example.grocery.controller;

import org.example.grocery.model.Product;
import org.example.grocery.model.Supplier;
import org.example.grocery.service.ProductRepository;
import org.example.grocery.service.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;


    @PostMapping("addProducts")
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {
        List<Product> savedProducts = new ArrayList<>();

        for (Product product : products) {
            Product existingProduct = productRepository.findByNameAndSupplierId(product.getName(), product.getSupplier().getId());

            if (existingProduct == null) {
                Product savedProduct = productRepository.save(product);
                savedProducts.add(savedProduct);
            }
        }

        return new ResponseEntity<>(savedProducts, HttpStatus.CREATED);
    }



    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }
}
