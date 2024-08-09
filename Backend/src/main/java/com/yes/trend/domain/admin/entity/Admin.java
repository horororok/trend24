package com.yes.trend.domain.admin.entity;

import java.util.List;

import com.yes.trend.common.entity.BaseEntity;
import com.yes.trend.domain.box.entity.Box;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Admin extends BaseEntity {

	@Column(length = 100)
	private String adminId;

	@Column(length = 100)
	private String adminPw;

	@Column(length = 100)
	private String name;

	@Setter
	private Byte layout = 1;

	@Column(length = 100)
	private String branch = "";

	@Setter
	private String customName = "커스텀 페이지";

	@Setter
	private String customContents = "";

	@OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
	private List<Box> boxes;

	@Builder
	public Admin(String adminId, String adminPw, String name, String branch) {
		this.adminId = adminId;
		this.adminPw = adminPw;
		this.name = name;
		this.branch = branch;
	}
}