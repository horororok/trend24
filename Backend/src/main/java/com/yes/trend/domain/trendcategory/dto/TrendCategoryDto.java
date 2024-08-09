package com.yes.trend.domain.trendcategory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TrendCategoryDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		private Integer trendCategoryId;
		private String name;
	}
}
