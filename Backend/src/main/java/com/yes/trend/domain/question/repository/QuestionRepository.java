package com.yes.trend.domain.question.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

	List<Question> findAll();

	@Query("SELECT bqm.book FROM BookQuestionMap bqm WHERE bqm.question.id = :questionId ORDER BY bqm.recommendCnt DESC")
	List<Book> findTop10BooksByQuestionId(@Param("questionId") Integer questionId);

}
