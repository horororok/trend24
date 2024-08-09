package com.yes.trend.api.search.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.search.dto.SearchDto;
import com.yes.trend.api.search.service.SearchService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.domain.book.dto.BookDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {
	private final SearchService searchService;

	@Operation(summary = "BS-01 도서 검색", description = "category는 카테고리 이름 (string)")
	@GetMapping("/")
	public ApiResponse<SearchDto.Response> search(
		@RequestParam(required = false) String title,
		@RequestParam(required = false) String category,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "40") int size) {

		return ApiResponse.success(SuccessCode.GET_SUCCESS, searchService.searchBooks(title, category, page, size));
	}

	@Operation(summary = "BS-03 도서 문장으로 검색", description = "live searching")
	@GetMapping("/live")
	public ApiResponse<ListDto<BookDto.Response>> liveSearch(
		@RequestParam String sentence) {

		return ApiResponse.success(SuccessCode.GET_SUCCESS, searchService.liveSearch(sentence));
	}
}
