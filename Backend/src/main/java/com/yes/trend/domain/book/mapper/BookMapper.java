package com.yes.trend.domain.book.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.yes.trend.domain.book.dto.BookDto;
import com.yes.trend.domain.book.entity.Book;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BookMapper {
	@Mapping(target = "bookId", source = "id")
	BookDto.Response BookToDto(Book book);
}