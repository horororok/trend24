package com.yes.trend.api.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.api.auth.dto.AuthDto;
import com.yes.trend.api.auth.service.AuthService;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;

	@PostMapping("/signup")
	public ApiResponse<String> regist(@Valid @RequestBody AuthDto.Post authDto) {
		return ApiResponse.success(SuccessCode.POST_SUCCESS, authService.signup(authDto));
	}

	@PostMapping("/signin")
	public ApiResponse<AuthDto.AuthResponse> login(@RequestBody AuthDto.AuthRequest authDto) {
		AuthDto.AuthResponse admin = authService.signin(authDto);

		if (admin.getAdminId() != null) {
			return ApiResponse.success(SuccessCode.POST_SUCCESS, admin);
		} else {
			return ApiResponse.error(ErrorCode.ADMIN_NOT_FOUND, admin);
		}
	}

}
