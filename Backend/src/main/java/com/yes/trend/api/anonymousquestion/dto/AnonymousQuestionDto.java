package com.yes.trend.api.anonymousquestion.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class AnonymousQuestionDto {
	@Getter
	@NoArgsConstructor
	public static class SelectedBook {
		private String bookId;
	}
}
