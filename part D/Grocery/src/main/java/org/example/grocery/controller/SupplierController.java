package org.example.grocery.controller;

import org.example.grocery.model.Supplier;
import org.example.grocery.service.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping("addSupplier")
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
        Supplier existSupplier = supplierRepository.findByCompanyName(supplier.getCompanyName());
        if (existSupplier == null) {
            Supplier savedSupplier = supplierRepository.save(supplier);
            return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED); //201
        }
        return new ResponseEntity<>(existSupplier, HttpStatus.CONFLICT); //409
    }

    @PostMapping("login")
    public ResponseEntity<Supplier> login(@RequestBody Supplier supplier) {
        Supplier existSupplier = supplierRepository.findByCompanyName(supplier.getCompanyName());
        if (existSupplier == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (existSupplier.getPassword().equals(supplier.getPassword())) {
            return new ResponseEntity<>(existSupplier, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Supplier>> getAll() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }
}
