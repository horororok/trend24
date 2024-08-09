package com.yes.trend.api.anonymous.controller;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.anonymous.dto.AnonymousDto;
import com.yes.trend.api.anonymous.service.AnonymousService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous2")
public class AnonymousController {
	private final AnonymousService anonymousService;

	@Operation(summary = "BR-03 도서 및 키워드 클릭 수 올리기", description = "")
	@PostMapping("/recommend/book/{bookId}/click")
	public ApiResponse<AnonymousDto.BookKeywordsClickCountDto> postBookKeywordClickCount(@PathVariable Integer bookId,
		@RequestParam(name = "category-id") Byte categoryId, @RequestParam String keywords) {

		StringTokenizer stringTokenizer = new StringTokenizer(keywords, ",");
		Set<String> keywordNames = new HashSet<>();
		while (stringTokenizer.hasMoreTokens()) {
			String target = stringTokenizer.nextToken();
			keywordNames.add(target);
		}

		return ApiResponse.success(SuccessCode.GET_SUCCESS,
			anonymousService.postBookKeywordClickCount(bookId, categoryId, keywordNames.stream().toList()));
	}

	@Operation(summary = "BR-01 카테고리별 키워드 및 도서 목록 (워드클라우드)", description = "category-id 를 입력하면 해당 "
		+ "카테고리별 도서를 size 권을 보여준다. (아직 category-id 입력은 미구현) size의 기본값은 5이다. \ndate 이후의 키워드들을 보내준다. "
		+ "date 형식: 2024-05-10 디폴트값은 7일전 (오늘이 5월 17일이면 디폴트는 5월 10일)")
	@GetMapping("/recommend")
	public ApiResponse<ListDto<AnonymousDto.KeywordsAndBooksByCategory>> getKeywordsAndBooksByCategory(
		@RequestParam(required = false) Byte categoryId,
		@RequestParam(defaultValue = "5") int size, @RequestParam(required = false) LocalDate date) {

		if (date == null) {
			date = anonymousService.getTrendSearchStartDate();
		}

		return ApiResponse.success(SuccessCode.GET_SUCCESS,
			anonymousService.getKeywordsAndBooksByCategory(categoryId, size, date));
	}

}
