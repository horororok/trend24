package com.yes.trend.domain.bookclick.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.book.entity.Book;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "book_click")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookClick extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id")
	private Book book;

	private Integer count = 0;

	public BookClick(Book book) {
		this.book = book;
	}

	public void addClickCount() {
		Integer click = this.getCount() + 1;
		this.count = click;
	}
}
