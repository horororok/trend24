package com.yes.trend.api.recommend.dto;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.yes.trend.common.dto.PageInfoDto;
import com.yes.trend.domain.book.dto.BookDto;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.keyword.dto.KeywordDto;
import com.yes.trend.domain.trendcategory.dto.TrendCategoryDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

public class RecommendDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response {
		private PageInfoDto pageInfo;
		private List<BookWithKeywords> list;
	}

	// 책과 해당 책을 추천해준 키워드들
	@Getter
	@SuperBuilder
	@NoArgsConstructor
	@ToString
	public static class BookWithKeywords extends BookDto.Response {
		@Setter
		private Set<String> keywords = new LinkedHashSet<>();

		public BookWithKeywords(Integer bookId, Integer productId, String productName, String categoryName,
			String searchKeyword, Integer totalClickCount, Integer totalOrderCount, Integer totalOrderAmount,
			Integer salePrice,
			String contents, Integer totalPurchaseCount) {
			super(bookId, productId, productName, categoryName, searchKeyword, totalClickCount, totalOrderCount,
				totalOrderAmount, salePrice, contents, totalPurchaseCount);
		}

		public BookWithKeywords(Book book, List<String> keywords) {
			super(book.getId(), book.getProductId(), book.getProductName(), book.getCategoryName(),
				book.getSearchKeyword(), book.getTotalClickCount(), book.getTotalOrderCount(),
				book.getTotalOrderAmount(), book.getSalePrice(), book.getContents(), book.getTotalPurchaseCount());
			this.keywords = keywords.stream().collect(Collectors.toSet());
		}
	}

	@Getter
	@NoArgsConstructor
	public static class CategoryWithKeywords extends TrendCategoryDto.Response {
		private List<KeywordDto.Response> keywords = new ArrayList<>();

		@Builder
		public CategoryWithKeywords(Integer trendCategoryId, String name, List<KeywordDto.Response> keywords) {
			super(trendCategoryId, name);
			if (keywords != null) {
				this.keywords = keywords;
			}
		}
	}

}
