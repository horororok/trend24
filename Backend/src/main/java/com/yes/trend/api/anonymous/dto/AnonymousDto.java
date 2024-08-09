package com.yes.trend.api.anonymous.dto;

import java.util.ArrayList;
import java.util.List;

import com.yes.trend.api.recommend.dto.RecommendDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class AnonymousDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class BookKeywordsClickCountDto {
		private Integer bookId;
		private Integer clickCount;
		private List<KeywordClickDto> keywords;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class KeywordClickDto {
		private Integer keywordClickId;
		private String name;
		private Integer clickCount;
		private String trendCategoryName;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@ToString
	public static class KeywordsAndBooksByCategory {
		private String name; // 트렌드 카테고리 이름
		private List<KeywordWithFrequency> keywords = new ArrayList<>();
		private List<RecommendDto.BookWithKeywords> books = new ArrayList<>();

		public KeywordsAndBooksByCategory(String name) {
			this.name = name;
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@ToString
	public static class KeywordWithFrequency {
		private String name;
		private Integer freq;

	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@ToString
	// DB에서 꺼내오는 형식
	public static class BookWithKeywordNamesByCategory {
		private Integer trendCategoryId;
		private String trendCategoryName;
		private String keywordNames;
		private Integer bookId;
		private Integer productId;
		private String searchKeyword;
		private Integer totalClickCount;
		private Integer totalOrderCount;
		private Integer totalOrderAmount;
		private String contents;
		private String productName;
		private Integer salePrice;
		private String categoryName;
		private Integer totalPurchaseCount;
	}

	@Getter
	@NoArgsConstructor
	@ToString
	// DB에서 꺼내오는 형식
	public static class KeywordFrequencyByCategory {
		private Integer id;
		private String categoryName;
		private String keywordName;
		private Integer freq;

		public KeywordFrequencyByCategory(Integer id, String categoryName, String keywordName, Long freq) {
			this.id = id;
			this.categoryName = categoryName;
			this.keywordName = keywordName;
			this.freq = freq.intValue();
		}
	}
}
