package com.yes.trend.api.anonymous.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.yes.trend.api.anonymous.dto.AnonymousDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class WordCloudRepository {
	private final EntityManager entityManager;

	public List<AnonymousDto.KeywordFrequencyByCategory> findKeywordsFrequencyByCategories(LocalDate startDate) {
		String sql = "SELECT tc.id, tc.name, keyword.name, COUNT(keyword.name) AS freq " +
			"FROM keyword " +
			"INNER JOIN trend_category tc ON keyword.category_id = tc.id " +
			"WHERE DATE(keyword.created_time) > DATE(:localDate) " +
			"GROUP BY keyword.name, tc.id " +
			"ORDER BY tc.id, COUNT(keyword.name) DESC, MAX(keyword.created_time) DESC";
		Query query = entityManager.createNativeQuery(sql, AnonymousDto.KeywordFrequencyByCategory.class);
		query.setParameter("localDate", startDate);
		return query.getResultList();
	}

	public List<AnonymousDto.BookWithKeywordNamesByCategory> findBooksAndKeywordsByCategories(LocalDate startDate,
		int size) {
		String sql =
			"SELECT subquery.trend_category_id, subquery.trend_category_name, keyword_names, book_id, product_id, search_keyword, total_click_count, total_order_count, total_order_amount, contents, product_name, sale_price, category_name, total_purchase_count "
				+ "FROM (SELECT ROW_NUMBER() OVER (PARTITION BY tc.id ORDER BY SUM(tckeyword.kcount) DESC, MAX(daily_recommend.id) DESC) AS rn, "
				+ "             MAX(daily_recommend.id) AS max_daily_recommend_id, "
				+ "             book.id AS book_id, "
				+ "             book.category_name, "
				+ "             contents, "
				+ "             product_id, "
				+ "             product_name, "
				+ "             sale_price, "
				+ "             search_keyword, "
				+ "             total_click_count, "
				+ "             total_order_amount, "
				+ "             total_order_count, "
				+ "             total_purchase_count, "
				+ "             tc.id AS trend_category_id, "
				+ "             tc.name AS trend_category_name, "
				+ "             MAX(kcount) AS max_kcount, "
				+ "             GROUP_CONCAT(DISTINCT tckeyword.kname ORDER BY tckeyword.kcount DESC SEPARATOR ',') AS keyword_names "
				+ "      FROM daily_recommend "
				+ "      INNER JOIN recommend_keyword ON daily_recommend.id = recommend_keyword.daily_recommend_id "
				+ "      INNER JOIN keyword ON recommend_keyword.keyword_id = keyword.id "
				+ "      INNER JOIN trend_category tc ON keyword.category_id = tc.id "
				+ "      INNER JOIN book ON daily_recommend.book_id = book.id "
				+ "      INNER JOIN (SELECT tc.id AS tcid, "
				+ "                         tc.name AS tcname, "
				+ "                         keyword.name AS kname, "
				+ "                         COUNT(keyword.name) AS kcount, "
				+ "                         MAX(keyword.created_time) "
				+ "                  FROM keyword "
				+ "                  INNER JOIN trend_category tc ON keyword.category_id = tc.id "
				+ "                  WHERE DATE(keyword.created_time) > DATE(:localDate) "
				+ "                  GROUP BY keyword.name, tc.id "
				+ "                  ORDER BY tc.id, COUNT(keyword.name) DESC, MAX(keyword.created_time) DESC) tckeyword "
				+ "                 ON tckeyword.tcid = keyword.category_id AND tckeyword.kname = keyword.name "
				+ "      WHERE DATE(keyword.created_time) > DATE(:localDate) "
				+ "      GROUP BY book.id, tc.id "
				+ "      ORDER BY tc.id, SUM(tckeyword.kcount) DESC, MAX(daily_recommend.id) DESC) subquery "
				+ "WHERE rn <= :size "
				+ "ORDER BY trend_category_id, rn";

		Query query = entityManager.createNativeQuery(sql, AnonymousDto.BookWithKeywordNamesByCategory.class);
		query.setParameter("localDate", startDate);
		query.setParameter("size", size);
		return query.getResultList();

	}

}
