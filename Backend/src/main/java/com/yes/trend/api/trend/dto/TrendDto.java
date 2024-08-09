package com.yes.trend.api.trend.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.yes.trend.domain.keyword.dto.KeywordDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TrendDto {
	@Getter
	@NoArgsConstructor
	public static class DailyKeywordsDto {
		private LocalDate date;
		private List<KeywordDto.Response> words;

		@Builder
		public DailyKeywordsDto(LocalDate date, List<KeywordDto.Response> words) {
			this.date = date;
			this.words = words;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class KeywordRanking {
		int ranking;
		private LocalDate date;

		@Builder
		public KeywordRanking(LocalDate date, int ranking) {
			this.date = date;
			this.ranking = ranking;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class OriginData {
		private String uri = "";
		private JsonNode contents;

		@Builder
		public OriginData(String uri, JsonNode contents) {
			if (uri != null)
				this.uri = uri;
			this.contents = contents;
		}
	}
}
