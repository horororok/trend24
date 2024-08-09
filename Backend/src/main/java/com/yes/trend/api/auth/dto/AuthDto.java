package com.yes.trend.api.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class AuthDto {

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class AuthRequest {
		@Setter
		private String adminId;
		private String adminPw;
	}

	@Getter
	@NoArgsConstructor
	@ToString
	public static class AuthResponse {

		private String adminId;
		@Setter
		private String name;
		@Setter
		private String branch; // 지점
		private String accessToken;
		private String refreshToken;

		@Builder
		public AuthResponse(String adminId, String accessToken, String refreshToken, String name, String branch) {
			this.adminId = adminId;
			this.accessToken = accessToken;
			this.name = name;
			this.branch = branch;
			this.refreshToken = refreshToken;
		}
	}

	@Getter
	@Setter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Post {
		@NotBlank(message = "adminId 내용을 입력해주세요")
		private String adminId;
		@NotBlank(message = "adminPw 내용을 입력해주세요")
		private String adminPw;
		@NotBlank(message = "name 내용을 입력해주세요")
		private String name;
		@NotBlank(message = "branch (지점) 내용을 입력해주세요")
		private String branch;
	}

}
