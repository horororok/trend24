package com.yes.trend.api.anonymousquestion.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.anonymousquestion.dto.AnonymousQuestionDto;
import com.yes.trend.api.anonymousquestion.service.AnonymousQuestionService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.domain.book.dto.BookDto;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.question.entity.Question;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous")
public class AnonymousQuestionController {
	private final AnonymousQuestionService anonymousQuestionService;

	@Operation(summary = "QB-01 익명질문페이지에서 전체 질문 리스트", description = "")
	@GetMapping("/question")
	public ApiResponse<ListDto<Question>> getQuestionAll() {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, anonymousQuestionService.getQuestionAll());
	}

	@Operation(summary = "QB-03 선택한 질문에 해당되는 책 리스트", description = "")
	@GetMapping("/question/{questionId}")
	public ApiResponse<ListDto<BookDto.Response>> getBookListByQuestionId(@PathVariable("questionId") Integer questionId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS,
			anonymousQuestionService.getSelectQuestionBookList(questionId));
	}

	@Operation(summary = "QB-04 도서 검색창에 입력한 키워드", description = "예시) 입력값 : 라임 / 추출 책: 나의 라임 오렌지나무")
	@GetMapping("/search/{bookText}")
	public ApiResponse<ListDto<BookDto.Response>> getBookDataBySearch(@PathVariable("bookText") String bookText) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS,
			anonymousQuestionService.getfindBookByNameContain(bookText));
	}

	@Operation(summary = "QB-07 유저가 선택한 도서 보내기", description = "형식 -> { bookId:7 }")
	@PostMapping("/question/{questionId}/books")
	public ApiResponse<ListDto<BookDto.Response>> addBookToQuestion(
		@PathVariable Integer questionId,
		@RequestBody AnonymousQuestionDto.SelectedBook body
	) {

		Integer bookId = Integer.valueOf(body.getBookId());
		anonymousQuestionService.addBookToQuestion(questionId, bookId);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, anonymousQuestionService.getMomoryBook(bookId, questionId));

	}

}
