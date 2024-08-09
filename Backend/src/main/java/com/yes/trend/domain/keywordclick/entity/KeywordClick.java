package com.yes.trend.domain.keywordclick.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.trendcategory.entity.TrendCategory;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "keyword_click")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KeywordClick extends BaseEntity {
	private Integer clickCount = 0;

	private String keywordName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private TrendCategory category;

	public KeywordClick(String keywordName, TrendCategory category) {
		this.keywordName = keywordName;
		this.category = category;
	}

	public void addClickCount() {
		Integer count = this.getClickCount() + 1;
		this.clickCount = count;
	}
}
