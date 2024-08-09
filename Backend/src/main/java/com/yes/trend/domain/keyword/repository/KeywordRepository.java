package com.yes.trend.domain.keyword.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yes.trend.domain.keyword.entity.Keyword;

public interface KeywordRepository extends JpaRepository<Keyword, Integer> {
	List<Keyword> findByNameAndCreatedTimeBetween(String name, LocalDateTime start,
		LocalDateTime end);

	List<Keyword> findAllByName(String name);

	Keyword findByName(String name);

	@Query("SELECT k.name " +
		"FROM DailyRecommend dr " +
		"JOIN dr.recommendKeywords rk " +
		"JOIN rk.keyword k " +
		"WHERE dr.book.id = :book_id " +
		"AND k.category.id = :category_id " +
		"AND FUNCTION('date', k.createdTime) > :localDate " +
		"GROUP BY k.name " +
		"ORDER BY COUNT(k.name) DESC, MAX(k.createdTime) DESC")
	List<String> findTopKeyword_NameByBookIdAndCategoryId(Integer book_id, Byte category_id, LocalDate localDate,
		Pageable pageable);
}
