package com.yes.trend.domain.trendcategory.entity;

import java.util.List;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.keyword.entity.Keyword;
import com.yes.trend.domain.keywordclick.entity.KeywordClick;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trend_category")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrendCategory extends BaseEntity {

	@Column(length = 100)
	private String name;
	private Byte code;

	@OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
	private List<Keyword> keywords;

	@OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
	private List<KeywordClick> keywordClicks;

}
