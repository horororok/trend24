package com.yes.trend.domain.themacode.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.book.entity.Book;

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
@Table(name = "thema_code")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThemaCode extends BaseEntity {

	@Column(length = 100)
	private String value;

	@Column(length = 200)
	private String description;

	@Column(length = 200)
	private String note;

	private Double rerankScore;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id")
	private Book book;
}
