package com.yes.trend.domain.boxbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.boxbook.entity.BoxBook;

public interface BoxBookRepository extends JpaRepository<BoxBook, Integer> {
}
