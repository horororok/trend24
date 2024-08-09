package com.yes.trend.domain.question.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class questionDto {

	@Getter
	@NoArgsConstructor
	@ToString
	public static class Response {
		private Integer questionId;
		private String questionText;
	}
}
