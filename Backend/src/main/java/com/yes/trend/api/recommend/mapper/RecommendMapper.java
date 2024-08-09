package com.yes.trend.api.recommend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.yes.trend.api.recommend.dto.KeywordWithBookDto;
import com.yes.trend.api.recommend.dto.RecommendDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RecommendMapper {
	RecommendDto.BookWithKeywords KeywordWithBookDtoToBookWithKeywords(KeywordWithBookDto dto);
}
