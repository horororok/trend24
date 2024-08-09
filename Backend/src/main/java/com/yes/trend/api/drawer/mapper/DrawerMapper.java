package com.yes.trend.api.drawer.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import com.yes.trend.api.drawer.dto.DrawerDto;
import com.yes.trend.domain.book.dto.BookDto;
import com.yes.trend.domain.box.entity.Box;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DrawerMapper {

	@Mappings({
		@Mapping(target = "drawerId", source = "box.id"),
		@Mapping(target = "name", source = "box.name"),
		@Mapping(target = "books", source = "bookResponses")
	})
	DrawerDto.Response boxToResponse(Box box, List<BookDto.Response> bookResponses);

	@Mappings({
		@Mapping(target = "drawerId", source = "box.id"),
		@Mapping(target = "name", source = "box.name")
	})
	DrawerDto.Response boxToResponse(Box box);
}
