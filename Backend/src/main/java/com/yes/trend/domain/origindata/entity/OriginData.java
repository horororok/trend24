package com.yes.trend.domain.origindata.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.platform.entity.Platform;
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
@Table(name = "origin_data")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OriginData extends BaseEntity {
	private String uri;

	@Column(columnDefinition = "JSON")
	private String contents;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "platform_id")
	private Platform platform;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private TrendCategory category;
}
