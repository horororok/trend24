package com.yes.trend.common.dto;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfoDto {
	private int page;
	private int size;
	private long totalElements;
	private int totalPages;

	public PageInfoDto(Page<?> page) {
		this.page = page.getNumber();
		this.size = page.getSize();
		this.totalElements = page.getTotalElements();
		this.totalPages = page.getTotalPages();
	}
}
