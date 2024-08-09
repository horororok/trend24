package com.yes.trend.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

	private final StringBuilder sb = new StringBuilder();

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<String>> handleMethodArgumentNotValidException(
		MethodArgumentNotValidException ex) {
		log.error("메서드 Valid Exception 발생", ex);

		FieldError fieldError = ex.getBindingResult().getFieldError();

		String fieldName = "null";
		String errorMessage = "null";
		Object rejectedValue = "null";

		if (fieldError != null) {
			fieldName = fieldError.getField();
			errorMessage = fieldError.getDefaultMessage();
			rejectedValue = fieldError.getRejectedValue();
		}

		String responseMessage = String.format("Validation error: Field '%s' with value '%s' - %s", fieldName,
			rejectedValue, errorMessage);
		ApiResponse<String> response = ApiResponse.error(ErrorCode.BAD_PARAMETER,
			responseMessage);
		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ApiResponse<String>> handleCustomException(CustomException customException) {
		log.error("Custom Exception 발생!", customException);

		String stringData =
			customException.getData() == null ? null : customException.getData().toString();
		ApiResponse<String> response = ApiResponse.error(customException.getErrorCode(),
			stringData);
		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(Exception.class)
	protected final ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
		log.error("Exception 발생!", ex);

		ApiResponse<String> response = ApiResponse.globalError(HttpStatus.INTERNAL_SERVER_ERROR,
			ex.getMessage());

		return ResponseEntity.badRequest().body(response);
	}
}

