package com.yes.trend.domain.trendsource.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.keyword.entity.Keyword;
import com.yes.trend.domain.origindata.entity.OriginData;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trend_source")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrendSource extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "keyword_id")
	private Keyword keyword;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "origin_data_id")
	private OriginData originData;
}
