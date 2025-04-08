package org.example.grocery.controller;

import org.example.grocery.model.StoreOwner;
import org.example.grocery.service.StoreOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/storeOwner")
public class StoreOwnerController {

    @Autowired
    private StoreOwnerRepository storeOwnerRepository;

    @PostMapping("login")
    public ResponseEntity<StoreOwner> login(@RequestBody StoreOwner storeOwner) {
        StoreOwner existStoreOwner = storeOwnerRepository.findByName("Avital");
        if (existStoreOwner.getPassword().equals(storeOwner.getPassword())) {
            return new ResponseEntity<>(existStoreOwner, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("getStoreOwnerByName")
    public ResponseEntity<StoreOwner> getStoreOwnerByName() {
        StoreOwner storeOwner = storeOwnerRepository.findByName("Avital");
        if (storeOwner != null) {
            return new ResponseEntity<>(storeOwner, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
