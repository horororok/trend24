package com.yes.trend.domain.keyword.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.domain.keyword.entity.Keyword;
import com.yes.trend.domain.keyword.repository.KeywordRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeywordService {
	private final KeywordRepository keywordRepository;

	public Keyword findById(Integer keywordId) {
		return keywordRepository.findById(keywordId)
			.orElseThrow(() -> new CustomException(ErrorCode.NO_ID, keywordId));
	}
}
