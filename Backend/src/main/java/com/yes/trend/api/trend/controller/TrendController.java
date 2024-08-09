package com.yes.trend.api.trend.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.trend.dto.KeywordOriginDataDto;
import com.yes.trend.api.trend.dto.TrendDto;
import com.yes.trend.api.trend.service.TrendService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/trend")
public class TrendController {
	private final TrendService trendService;

	@Operation(summary = "HT-01 일별 인기 키워드", description = "일별 20개씩 인기 키워드를 보여준다.")
	@GetMapping("/keywords")
	public ApiResponse<ListDto<TrendDto.DailyKeywordsDto>> getDailyKeywords(
		@RequestParam(required = false) LocalDate date) {
		if (date == null) {
			date = LocalDate.now();
		}
		return ApiResponse.success(SuccessCode.GET_SUCCESS, trendService.getDailyKeywords(date));
	}

	@Operation(summary = "HT-05 키워드 변화 그래프", description = "1주일동안의 키워드 순위 변동 그래프")
	@GetMapping("/keywords/{keywordId}/ranking")
	public ApiResponse<ListDto<TrendDto.KeywordRanking>> getKeywordsRankingHistories(@PathVariable int keywordId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, trendService.getKeywordsRankingHistories(keywordId));
	}

	@Operation(summary = "HT-06 키워드 참고 데이터", description = "키워드 출처 데이터를 보내준다.")
	@GetMapping("/keywords/{keywordId}/reference")
	public ApiResponse<ListDto<KeywordOriginDataDto>> getKeywordOriginData(@PathVariable int keywordId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, trendService.getKeywordOriginData(keywordId));
	}
}
