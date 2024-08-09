package com.yes.trend.api.status.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
// DB에서 꺼낸 값 넣는 dto
public class TopKeywordDto {
	private String categories;
	private String keywordName;
	private Long clickCountSum;
}
