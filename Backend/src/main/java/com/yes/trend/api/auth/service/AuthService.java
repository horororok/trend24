package com.yes.trend.api.auth.service;

import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yes.trend.api.auth.dto.AuthDto;
import com.yes.trend.api.auth.jwt.TokenProvider;
import com.yes.trend.api.auth.mapper.AuthMapper;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.domain.admin.entity.Admin;
import com.yes.trend.domain.admin.repository.AdminRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
	private final AdminRepository adminRepository;
	private final TokenProvider tokenProvider;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final AuthMapper authMapper;

	public String signup(AuthDto.Post authDto) {
		String encodePassword = bCryptPasswordEncoder.encode(authDto.getAdminPw());
		authDto.setAdminPw(encodePassword);
		if (adminRepository.findByAdminId(authDto.getAdminId()).isPresent()) {
			throw new CustomException(ErrorCode.SIGNUP_FAILED, authDto.getAdminId());
		}
		adminRepository.save(authMapper.AuthDtoToAdmin(authDto));
		return authDto.getAdminId();
	}

	@Transactional
	public AuthDto.AuthResponse signin(AuthDto.AuthRequest authDto) {
		Optional<Admin> adminOptional = adminRepository.findByAdminId(authDto.getAdminId());

		Admin admin = null;
		if (adminOptional.isPresent()) {
			admin = adminOptional.get();
		}

		if (!(admin != null && bCryptPasswordEncoder.matches(authDto.getAdminPw(), admin.getAdminPw()))) {
			throw new CustomException(ErrorCode.SIGNIN_FAILED, authDto.getAdminId());
		}
		Authentication authentication = new UsernamePasswordAuthenticationToken(admin.getAdminId(), admin.getAdminPw());
		// SecurityContextHolder에 로그인 한 유저 정보 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);

		AuthDto.AuthResponse authResponse = tokenProvider.generateTokenResponse(authentication);

		authResponse.setBranch(admin.getBranch());
		authResponse.setName(admin.getName());

		return authResponse;
	}

}
