package com.yes.trend.domain.platform.entity;

import com.yes.trend.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "platform")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Platform extends BaseEntity {

	@Column(length = 100)
	private String name;
}
