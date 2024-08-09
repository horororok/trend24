package com.yes.trend.domain.platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yes.trend.domain.platform.entity.Platform;

public interface PlatformRepository extends JpaRepository<Platform, Integer> {
}
