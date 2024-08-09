package com.yes.trend.api.trend.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KeywordOriginDataDto {
	private Integer platformId;
	private String platform;
	private TrendDto.OriginData data;

	@Builder
	public KeywordOriginDataDto(Integer platformId, String platform, TrendDto.OriginData data) {
		this.platformId = platformId;
		this.platform = platform;
		this.data = data;
	}

	@Builder
	public KeywordOriginDataDto(Integer platformId, String platformName, String uri, String contents) throws
		JsonProcessingException {
		this.platformId = platformId;
		this.platform = platformName;
		this.data = new TrendDto.OriginData(uri, new ObjectMapper().readTree(contents));
	}
}
