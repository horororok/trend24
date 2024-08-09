package com.yes.trend.api.status.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.yes.trend.api.anonymous.dto.AnonymousDto;
import com.yes.trend.api.status.dto.TopKeywordDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class StatusRepository {
	private final EntityManager entityManager;

	public List<TopKeywordDto> findTopKeywordClickCount(LocalDate startDate, int size) {
		String sql = """
    SELECT GROUP_CONCAT(tc.name), keyword_name, SUM(click_count) AS clickCountSum
    FROM keyword_click
    INNER JOIN trend.trend_category tc ON keyword_click.category_id = tc.id
    WHERE DATE(keyword_click.created_time) >= :localDate
    GROUP BY keyword_name
    ORDER BY clickCountSum DESC
    LIMIT :size
    """;
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("localDate", startDate);
		query.setParameter("size", size);

		List<Object[]> results = query.getResultList();
		return results.stream().map(o -> new TopKeywordDto(
			o[0].toString(), o[1].toString(), Long.parseLong(o[2].toString())
		)).collect(Collectors.toList());
	}
}
