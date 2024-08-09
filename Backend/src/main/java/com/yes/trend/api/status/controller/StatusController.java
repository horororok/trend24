package com.yes.trend.api.status.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.status.dto.StatusDto;
import com.yes.trend.api.status.service.StatusService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/status")
public class StatusController {
	private final StatusService statusService;

	@Operation(summary = "UA-02 도서 클릭수 리스트", description = "")
	@GetMapping("/books")
	public ApiResponse<ListDto<StatusDto.WeeklyTopClickedBooksDto>> getTopThreeClickBooks() {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, statusService.getWeeklyTopClickedBooks());
	}

	@Operation(summary = "UA-02-1 도서 누적 클릭수 리스트", description = "")
	@GetMapping("/books/{bookId}")
	public ApiResponse<ListDto<StatusDto.BookClickDto>> getWeeklyBookClicked(@PathVariable Integer bookId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, statusService.getWeeklyBookClickCount(bookId));
	}

	@Operation(summary = "UA-03 키워드 누적 클릭수 리스트", description = "")
	@GetMapping("/keywords")
	public ApiResponse<ListDto<StatusDto.TopClickedKeywordsDto>> getTopClickedKeyword() {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, statusService.getTopClickedKeyword());
	}

	@Operation(summary = "UA-03-1 키워드 누적 클릭수 리스트", description = "")
	@GetMapping("/keywords/{keywordName}")
	public ApiResponse<ListDto<StatusDto.KeywordClickDto>> getWeeklyKeywordClicked(@PathVariable String keywordName) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, statusService.getWeeklyKeywordClickCount(keywordName));
	}

}
