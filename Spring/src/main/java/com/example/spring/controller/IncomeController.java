package com.example.spring.controller;

import com.example.spring.model.Income;
import com.example.spring.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    @PostMapping("/add-income")
    public ResponseEntity<?> addIncome(@RequestBody Income income) {
        if (income.getTitle() == null || income.getCategory() == null || income.getDescription() == null || income.getDate() == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }
        if (income.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Amount must be a positive number!");
        }
        incomeRepository.save(income);
        return ResponseEntity.ok("Income Added");
    }

    @GetMapping("/get-incomes")
    public List<Income> getIncomes() {
        return incomeRepository.findAll();
    }

    @DeleteMapping("/delete-income/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable String id) {
        incomeRepository.deleteById(id);
        return ResponseEntity.ok("Income Deleted");
    }
}