package com.yes.trend.api.recommend.controller;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.recommend.dto.RecommendDto;
import com.yes.trend.api.recommend.service.RecommendService;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.common.util.NumberUtil;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {
	private final RecommendService recommendService;

	@Operation(summary = "TR-02 키워드 id로 추천된 책 리스트", description = "키워드가 여러 개면 , (쉼표) 로 구분한다")
	@GetMapping("/books")
	public ApiResponse<RecommendDto.Response> getRecommendedBooksByKeywordIds(
		@RequestParam() String keywords,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "100") int size) {
		StringTokenizer stringTokenizer = new StringTokenizer(keywords, ",");
		Set<Integer> keywordIds = new HashSet<>();
		while (stringTokenizer.hasMoreTokens()) {
			String target = stringTokenizer.nextToken();
			if (!NumberUtil.isOver1(target)) {
				throw new CustomException(ErrorCode.KEYWORDS_SHOULD_BE_ID, target);
			}
			keywordIds.add(Integer.parseInt(target));
		}

		return ApiResponse.success(
			SuccessCode.GET_SUCCESS, recommendService.getRecommendedBooksByKeywordIds(keywordIds.stream().toList(),
				page, size)
		);
	}

	@Operation(summary = "TR-01 카테고리별 키워드", description = "카테고리별 당일의 키워드 제공")
	@GetMapping("/trend-categories")
	public ApiResponse<ListDto<RecommendDto.CategoryWithKeywords>> getTrendCategories(
		@RequestParam(defaultValue = "true") boolean withKeywords,
		@RequestParam(required = false) LocalDate date) {
		if (withKeywords) {
			if (date == null) {
				date = LocalDate.now();
			}
			return ApiResponse.success(SuccessCode.GET_SUCCESS, recommendService.getTrendCategoriesWithKeywords(date));
		}
		return ApiResponse.success(SuccessCode.GET_SUCCESS, recommendService.getTrendCategories());
	}
}
