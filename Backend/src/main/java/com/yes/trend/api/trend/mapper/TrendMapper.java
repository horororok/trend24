package com.yes.trend.api.trend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.yes.trend.domain.keyword.dto.KeywordDto;
import com.yes.trend.domain.keyword.entity.KeywordView;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TrendMapper {
	@Mapping(target = "keywordId", source = "keywordView.id")
	KeywordDto.Response KeywordViewToResponseDto(KeywordView keywordView);

}
