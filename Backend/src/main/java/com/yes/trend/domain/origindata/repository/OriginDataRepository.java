package com.yes.trend.domain.origindata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yes.trend.api.trend.dto.KeywordOriginDataDto;
import com.yes.trend.domain.origindata.entity.OriginData;

public interface OriginDataRepository extends JpaRepository<OriginData, Integer> {

	@Query(
		"SELECT NEW com.yes.trend.api.trend.dto.KeywordOriginDataDto(p.id, p.name, od.uri, od.contents)" +
			" FROM TrendSource ts " +
			" JOIN ts.originData od " +
			" JOIN od.platform p " +
			" WHERE ts.keyword.id = :keywordId"
	)
	List<KeywordOriginDataDto> findKeywordOriginDataDtoByKeywordId(@Param("keywordId") Integer keywordId);
}
