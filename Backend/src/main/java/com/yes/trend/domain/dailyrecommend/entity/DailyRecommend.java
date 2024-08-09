package com.yes.trend.domain.dailyrecommend.entity;

import java.util.List;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.recommendkeyword.entity.RecommendKeyword;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "daily_recommend")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyRecommend extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id")
	private Book book;

	@OneToMany(mappedBy = "dailyRecommend", fetch = FetchType.LAZY)
	private List<RecommendKeyword> recommendKeywords;
}