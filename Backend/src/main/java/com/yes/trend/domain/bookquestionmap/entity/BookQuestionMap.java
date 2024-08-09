package com.yes.trend.domain.bookquestionmap.entity;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.question.entity.Question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book_question_map")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookQuestionMap extends BaseEntity {

	@Column
	private Integer recommendCnt;

	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question question;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	// 모든 필드를 포함하는 생성자 추가
	public BookQuestionMap(Integer recommendCnt, Question question, Book book) {
		this.recommendCnt = recommendCnt;
		this.question = question;
		this.book = book;
	}

}
