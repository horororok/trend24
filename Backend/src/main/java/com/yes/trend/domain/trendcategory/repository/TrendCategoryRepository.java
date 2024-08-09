package com.yes.trend.domain.trendcategory.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yes.trend.api.recommend.dto.TrendCategoryWithKeywordDto;
import com.yes.trend.domain.trendcategory.entity.TrendCategory;

public interface TrendCategoryRepository extends JpaRepository<TrendCategory, Byte> {
	@Query("SELECT NEW com.yes.trend.api.recommend.dto.TrendCategoryWithKeywordDto(" +
		"k.id, k.name, k.clickCount, k.ranking," +
		"tc.id, tc.name) " +
		"FROM TrendCategory tc " +
		"LEFT JOIN tc.keywords k " +
		"ON k.createdTime BETWEEN :start AND :end")
	List<TrendCategoryWithKeywordDto> findTrendCategoriesWithKeywordsBetween(
		@Param("start") LocalDateTime start,
		@Param("end") LocalDateTime end);
}
