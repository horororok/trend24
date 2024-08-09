package com.yes.trend.domain.bookclick.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.bookclick.entity.BookClick;

public interface BookClickRepository extends JpaRepository<BookClick, Integer> {
	List<BookClick> findByCreatedTimeAfter(LocalDateTime start);

	//  List<BookClick> findTop3ByCreatedTimeAfterOrderByClickCountDesc(LocalDateTime start);
	//
	//  @Query("SELECT SUM(b.clickCount) FROM BookClick b WHERE b.createdTime > :start ORDER BY b.clickCount DESC")
	//  List<BookClick> findTop3ByClickCountSumAfter(LocalDateTime start);

	List<BookClick> findAllByBookIdAndCreatedTimeBetween(Integer bookId, LocalDateTime start, LocalDateTime end);

	List<BookClick> findByCreatedTimeBetween(LocalDateTime start, LocalDateTime end);
	//  Book findByBook(Book book);

	Optional<BookClick> findByBookIdAndCreatedTimeBetween(Integer bookId, LocalDateTime start, LocalDateTime end);

}
