package com.yes.trend.domain.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}
