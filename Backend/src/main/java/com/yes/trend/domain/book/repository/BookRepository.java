package com.yes.trend.domain.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.yes.trend.domain.book.entity.Book;

import io.lettuce.core.dynamic.annotation.Param;

public interface BookRepository extends JpaRepository<Book, Integer>, QuerydslPredicateExecutor<Book> {
	Page<Book> findAll(Pageable pageable);

	// BookRepository
	@Query("SELECT b FROM Book b WHERE b.productName LIKE %:bookText%")
	List<Book> findByTitleContain(@Param("bookText") String bookText, Pageable pageable);

	@Query("SELECT b FROM Book b WHERE b.productId = :productId")
	Optional<Book> findByProductId(@Param("productId") Integer productId);

	@Query("SELECT b FROM Book b WHERE b.productId IN :productIds ")
	List<Book> findByProductIds(List<Integer> productIds);
}
