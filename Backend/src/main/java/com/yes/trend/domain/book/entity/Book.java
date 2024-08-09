package com.yes.trend.domain.book.entity;

import java.util.List;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.bookclick.entity.BookClick;
import com.yes.trend.domain.boxbook.entity.BoxBook;
import com.yes.trend.domain.tag.entity.Tag;
import com.yes.trend.domain.themacode.entity.ThemaCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book extends BaseEntity {
	private Integer productId;
	@Column(length = 255)
	private String productName;
	@Column(length = 50)
	private String categoryId;
	@Column(length = 100)
	private String categoryName;
	@Column(length = 255)
	private String searchKeyword;
	private Integer totalClickCount;
	private Integer totalOrderCount;
	private Integer totalOrderAmount;
	private Integer salePrice;
	@Column(columnDefinition = "TEXT")
	private String contents;
	private Integer totalPurchaseCount;

	@OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
	private List<Tag> tags;

	@OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
	private List<BookClick> bookClicks;

	@OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
	private List<ThemaCode> themaCodes;

	@OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
	private List<BoxBook> boxBooks;
}
