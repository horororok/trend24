package com.yes.trend.domain.box.entity;

import java.util.List;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.admin.entity.Admin;
import com.yes.trend.domain.boxbook.entity.BoxBook;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "box")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Box extends BaseEntity {

	@Column(length = 100)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "admin_id")
	private Admin admin;

	@OneToMany(mappedBy = "box", fetch = FetchType.LAZY)
	private List<BoxBook> boxBooks;

	public Box(String name, Admin admin) {
		this.name = name;
		this.admin = admin;
	}
}
