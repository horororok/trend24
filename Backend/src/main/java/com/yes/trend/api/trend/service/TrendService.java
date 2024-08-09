package com.yes.trend.api.trend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yes.trend.api.trend.dto.KeywordOriginDataDto;
import com.yes.trend.api.trend.dto.TrendDto;
import com.yes.trend.api.trend.mapper.TrendMapper;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.domain.keyword.dto.KeywordDto;
import com.yes.trend.domain.keyword.entity.Keyword;
import com.yes.trend.domain.keyword.entity.KeywordView;
import com.yes.trend.domain.keyword.repository.KeywordRepository;
import com.yes.trend.domain.keyword.repository.KeywordViewRepository;
import com.yes.trend.domain.keyword.service.KeywordService;
import com.yes.trend.domain.origindata.repository.OriginDataRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class TrendService {
	private final KeywordViewRepository keywordViewRepository;
	private final KeywordRepository keywordRepository;
	private final OriginDataRepository originDataRepository;
	private final TrendMapper trendMapper;
	private final KeywordService keywordService;

	public ListDto<TrendDto.DailyKeywordsDto> getDailyKeywords(LocalDate lastDate) {
		LocalDateTime todayStart = LocalDateTime.of(lastDate, LocalTime.MIN);
		LocalDateTime todayEnd = LocalDateTime.of(lastDate, LocalTime.MAX);

		// 오늘부터 7일
		LocalDateTime startOfDay = todayStart.minusWeeks(1L).plusDays(1L);
		LocalDateTime endOfDay = todayEnd;

		List<KeywordView> keywordViews = keywordViewRepository.findByCreatedTimeBetweenOrderByCreatedTimeDescRankingAsc(
			startOfDay, endOfDay);

		// 날짜별 데이터
		Map<LocalDate, List<KeywordDto.Response>> keywordsByDate = new LinkedHashMap<>();
		LocalDate targetDate = endOfDay.toLocalDate();
		while (targetDate.isEqual(startOfDay.toLocalDate()) || targetDate.isAfter(startOfDay.toLocalDate())) {
			keywordsByDate.put(targetDate, new ArrayList<>());
			targetDate = targetDate.minusDays(1L);
		}

		for (KeywordView keywordView : keywordViews) {
			{
				LocalDate date = keywordView.getCreatedTime().toLocalDate();
				keywordsByDate.get(date).add(trendMapper.KeywordViewToResponseDto(keywordView));
			}
		}

		// 결과값
		List<TrendDto.DailyKeywordsDto> keywordList = keywordsByDate.entrySet()
			.stream()
			.map(k -> TrendDto.DailyKeywordsDto.builder()
				.date(k.getKey())
				.words(k.getValue())
				.build())
			.toList();

		return new ListDto<>(keywordList);

	}

	public ListDto<TrendDto.KeywordRanking> getKeywordsRankingHistories(int keywordId) {
		Keyword keyword = keywordService.findById(keywordId);
		LocalDate keywordCreatedDate = keyword.getCreatedTime().toLocalDate();
		LocalDateTime startOfDay = LocalDateTime.of(keywordCreatedDate, LocalTime.MIN)
			.minusDays(6L);
		LocalDateTime endOfDay = LocalDateTime.of(keywordCreatedDate, LocalTime.MAX);

		List<Keyword> keywords = keywordRepository.findByNameAndCreatedTimeBetween(keyword.getName(), startOfDay,
			endOfDay);

		// 날짜별 랭킹
		Map<LocalDate, Integer> rakingByDate = new LinkedHashMap<>();
		for (int i = 0; i < 7; i++) {
			rakingByDate.put(keywordCreatedDate.minusDays(i), 0);
		}

		for (Keyword k : keywords) {
			LocalDate targetDate = k.getCreatedTime().toLocalDate();
			rakingByDate.put(targetDate, k.getRanking());
		}

		// 결과값
		List<TrendDto.KeywordRanking> keywordHistories = rakingByDate.entrySet()
			.stream()
			.map(k -> TrendDto.KeywordRanking.builder()
				.date(k.getKey())
				.ranking(k.getValue())
				.build())
			.toList();

		return new ListDto<>(keywordHistories);

	}

	public ListDto<KeywordOriginDataDto> getKeywordOriginData(int keywordId) {
		// 잘못 입력했는지 검증용
		Keyword keyword = keywordService.findById(keywordId);
		List<KeywordOriginDataDto> dtos = originDataRepository.findKeywordOriginDataDtoByKeywordId(keywordId);
		if (dtos.isEmpty()) {
			throw new CustomException(ErrorCode.NO_ORIGIN_DATA_BY_KEYWORD, keywordId);
		}
		return new ListDto<>(dtos);
	}

}
