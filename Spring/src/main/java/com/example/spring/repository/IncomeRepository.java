package com.example.spring.repository;

import com.example.spring.model.Income;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IncomeRepository extends MongoRepository<Income, String> {
}