package com.yes.trend.api.recommend.dto;

import com.yes.trend.domain.keyword.dto.KeywordDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class TrendCategoryWithKeywordDto extends KeywordDto.Response {
	private Integer trendCategoryId;
	private String trendCategoryName;

	public TrendCategoryWithKeywordDto(Integer keywordId, String keywordName, Integer clickCount, Integer ranking,
		Integer trendCategoryId, String trendCategoryName) {
		super(keywordId, keywordName, clickCount, ranking);
		this.trendCategoryId = trendCategoryId;
		this.trendCategoryName = trendCategoryName;
	}
}
