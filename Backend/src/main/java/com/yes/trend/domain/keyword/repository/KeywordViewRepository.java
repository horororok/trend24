package com.yes.trend.domain.keyword.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.keyword.entity.KeywordView;

public interface KeywordViewRepository extends JpaRepository<KeywordView, Integer> {
	List<KeywordView> findByCreatedTimeBetweenOrderByCreatedTimeDescRankingAsc(LocalDateTime start, LocalDateTime end);
}
