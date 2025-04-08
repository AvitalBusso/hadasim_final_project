package org.example.grocery.service;

import org.example.grocery.model.StoreOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreOwnerRepository extends JpaRepository<StoreOwner, Integer> {
    StoreOwner findByName(String name);
}
