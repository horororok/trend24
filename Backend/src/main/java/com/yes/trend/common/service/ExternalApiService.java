package com.yes.trend.common.service;

import java.net.URI;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExternalApiService {

	private final ObjectMapper objectMapper;

	public <T> T sendGetRequest(URI uri, Class<T> responseType) {
		// 요청 보내기
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> responseEntity = restTemplate.getForEntity(uri, Map.class);

		// 받은 응답 데이터 Camel Case로 변환하기
		ObjectMapper mapper = new ObjectMapper();
		mapper.setPropertyNamingStrategy(new PropertyNamingStrategies.SnakeCaseStrategy());

		return mapper.convertValue(responseEntity.getBody(), responseType);
	}

	private MultiValueMap<String, String> convertDtoToMultiValueMap(Object dto) {
		MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();

		if (dto == null) {
			return multiValueMap;
		}

		// DTO 객체를 Map으로 변환
		Map<String, Object> dtoMap = objectMapper.convertValue(dto, Map.class);

		// Map의 키와 값을 MultiValueMap에 추가 (Snake Case로 변환)
		for (Map.Entry<String, Object> entry : dtoMap.entrySet()) {
			String snakeCaseKey = camelToSnakeCase(entry.getKey());
			multiValueMap.add(snakeCaseKey, entry.getValue().toString());
		}

		return multiValueMap;
	}

	private String camelToSnakeCase(String camelCase) {
		return camelCase.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
	}
}
