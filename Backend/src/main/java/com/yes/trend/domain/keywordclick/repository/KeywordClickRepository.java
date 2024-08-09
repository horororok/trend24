package com.yes.trend.domain.keywordclick.repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yes.trend.api.status.dto.TopKeywordDto;
import com.yes.trend.domain.keywordclick.entity.KeywordClick;

public interface KeywordClickRepository extends JpaRepository<KeywordClick, Integer> {
	Optional<KeywordClick> findByKeywordNameAndCategory_IdAndCreatedTimeBetween(String keywordName, Byte CategoryId,
		LocalDateTime startDate, LocalDateTime endDate);

	@Query("SELECT CASE WHEN COUNT(dr) > 0 THEN true ELSE false END " +
		"FROM DailyRecommend dr " +
		"JOIN dr.recommendKeywords rk " +
		"JOIN rk.keyword k " +
		"JOIN dr.book b " +
		"WHERE b.id = :bookId " +
		"AND k.name = :keywordName")
		// 해당 키워드 이름으로 bookId를 가진 책이 추천된 적 있는지
	boolean existsByBookIdAndKeywordName(@Param("bookId") Integer bookId, @Param("keywordName") String keywordName);


	@Query("SELECT NEW com.yes.trend.api.status.dto.TopKeywordDto(tc.name, kc.keywordName, SUM(kc.clickCount)) " +
		"FROM KeywordClick kc " +
		"JOIN kc.category tc " +
		"WHERE FUNCTION('date', kc.createdTime) >= :localDate " +
		"GROUP BY kc.keywordName, tc.id " +
		"ORDER BY SUM(kc.clickCount) DESC")
	List<TopKeywordDto> findByTopKeywordsByClickCount(@Param("localDate") LocalDate localDate, Pageable pageable);
}
