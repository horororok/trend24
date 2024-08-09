package com.yes.trend.domain.trendsource.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.trendsource.entity.TrendSource;

public interface TrendSourceRepository extends JpaRepository<TrendSource, Integer> {
}
