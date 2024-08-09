package com.yes.trend.api.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.yes.trend.api.auth.dto.AuthDto;
import com.yes.trend.domain.admin.entity.Admin;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface AuthMapper {
	Admin AuthDtoToAdmin(AuthDto.Post authDto);
}
