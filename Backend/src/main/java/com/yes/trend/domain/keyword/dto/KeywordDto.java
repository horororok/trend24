package com.yes.trend.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class KeywordDto {

	@Getter
	@NoArgsConstructor
	@ToString
	public static class Response {
		private Integer keywordId;
		private String name;
		private Integer clickCount;
		private Integer ranking;

		@Builder
		public Response(Integer keywordId, String name, Integer clickCount, Integer ranking) {
			this.keywordId = keywordId;
			this.name = name;
			this.clickCount = clickCount;
			this.ranking = ranking;
		}
	}
}
