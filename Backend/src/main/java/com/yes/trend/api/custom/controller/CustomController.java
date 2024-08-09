package com.yes.trend.api.custom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.custom.dto.CustomDto;
import com.yes.trend.api.custom.service.CustomService;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/custom")
public class CustomController {
	private final CustomService customService;

	@Operation(summary = "CP-05 커스텀 페이지 제목 변경", description = "name 조건: null 불가, 공백만 있으면 안 됨, 100자 이내")
	@PatchMapping("/page")
	public ApiResponse<CustomDto.PatchPageName> patchPageName(@Valid @RequestBody CustomDto.PatchPageName name) {
		return ApiResponse.success(SuccessCode.PATCH_SUCCESS, customService.patchPageName(name));
	}

	@Operation(summary = "CP-02 커스텀 페이지 컴포넌트 저장", description = "프론트에서 준 값을 그대로 string으로 저장")
	@PatchMapping("/components")
	public ApiResponse<CustomDto.Components> patchComponents(@Valid @RequestBody CustomDto.Components components) {
		return ApiResponse.success(SuccessCode.PATCH_SUCCESS, customService.patchComponents(components));
	}

	@Operation(summary = "CP-04 컴포넌트 리스트 조회", description = "없으면 빈 문자열 반환")
	@GetMapping("/components")
	public ApiResponse<CustomDto.Components> getComponents() {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, customService.getComponents());
	}

	@Operation(summary = "CP-06 페이지 이름 보기", description = "")
	@GetMapping("/page")
	public ApiResponse<CustomDto.PatchPageName> getPageName() {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, customService.getPageName());
	}
}
