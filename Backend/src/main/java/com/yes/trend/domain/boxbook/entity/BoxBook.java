package com.yes.trend.domain.boxbook.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.box.entity.Box;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "box_book")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoxBook extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "box_id")
	private Box box;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id")
	private Book book;

	@Builder
	public BoxBook(Box box, Book book) {
		this.box = box;
		this.book = book;
	}
}
