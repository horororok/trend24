package com.yes.trend.domain.keyword.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.trendcategory.entity.TrendCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "keyword")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyword extends BaseEntity {

	@Column(length = 255)
	private String name;

	private Integer clickCount;
	private Integer ranking;
	private Boolean selected;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private TrendCategory category;

	public void addClickCount(Keyword keyword) {
		Integer count = this.getClickCount() + 1;
		this.clickCount = count;
	}
}
