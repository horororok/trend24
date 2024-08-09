package com.yes.trend.api.recommend.dto;

import com.yes.trend.domain.book.dto.BookDto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
// 해당 키워드로 추천된 책 하나
public class KeywordWithBookDto extends BookDto.Response {
	private String keyword;

	public KeywordWithBookDto(String keyword, Integer bookId, Integer productId, String productName,
		String categoryName,
		String searchKeyword,
		Integer totalClickCount, Integer totalOrderCount, Integer totalOrderAmount, Integer salePrice,
		String contents,
		Integer totalPurchaseCount) {
		super(bookId, productId, productName, categoryName, searchKeyword, totalClickCount, totalOrderCount,
			totalOrderAmount, salePrice, contents, totalPurchaseCount);
		this.keyword = keyword;
	}

}
