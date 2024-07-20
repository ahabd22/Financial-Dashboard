package com.example.spring.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "expenses")
public class Expense {
    @Id
    private String id;
    private String title;
    private Double amount;
    private String type = "expense";
    private LocalDate date;
    private String category;
    private String description;
}