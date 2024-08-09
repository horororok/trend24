package com.yes.trend.api.custom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CustomDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class PatchPageName {
		// 페이지 제목
		@NotBlank(message = "페이지 이름을 입력하세요.")
		@Size(max = 100, message = "이름은 100자 이내여야 합니다.")
		private String name;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Components {
		@NotBlank(message = "내용을 입력해주세요")
		private String customContents;
	}
}
