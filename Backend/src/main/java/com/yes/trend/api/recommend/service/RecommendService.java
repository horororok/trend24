package com.yes.trend.api.recommend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yes.trend.api.recommend.dto.KeywordWithBookDto;
import com.yes.trend.api.recommend.dto.RecommendDto;
import com.yes.trend.api.recommend.dto.TrendCategoryWithKeywordDto;
import com.yes.trend.api.recommend.mapper.RecommendMapper;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.common.dto.PageInfoDto;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.domain.book.repository.BookRepository;
import com.yes.trend.domain.keyword.dto.KeywordDto;
import com.yes.trend.domain.recommendkeyword.repository.RecommendKeywordRepository;
import com.yes.trend.domain.trendcategory.entity.TrendCategory;
import com.yes.trend.domain.trendcategory.repository.TrendCategoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class RecommendService {
	private final BookRepository bookRepository;
	private final RecommendKeywordRepository recommendKeywordRepository;
	private final TrendCategoryRepository trendCategoryRepository;
	private final RecommendMapper recommendMapper;

	public RecommendDto.Response getRecommendedBooksByKeywordIds(List<Integer> keywordIds, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Integer> bookIds = recommendKeywordRepository.findBooksByKeywordIds(keywordIds, pageable);

		// keyword 최소 날짜로 필터링
		LocalDate minCreatedDate = recommendKeywordRepository.findMinimumCreatedDate(keywordIds)
			.orElseThrow(() -> new CustomException(
				ErrorCode.NO_ID, keywordIds));

		List<KeywordWithBookDto> keywordWithBookDtos = recommendKeywordRepository.findKeywordWithBookByBookIds(
			bookIds.toList(), minCreatedDate);

		// 순서 유지
		Map<Integer, RecommendDto.BookWithKeywords> responseMap = new LinkedHashMap<>();
		for (Integer id : bookIds.toList()) {
			responseMap.put(id, null);
		}

		for (KeywordWithBookDto keywordWithBookDto : keywordWithBookDtos) {
			Integer bookId = keywordWithBookDto.getBookId();
			RecommendDto.BookWithKeywords currentBookWithKeywords = responseMap.get(bookId);
			if (currentBookWithKeywords == null) {
				responseMap.put(bookId, recommendMapper.KeywordWithBookDtoToBookWithKeywords(keywordWithBookDto));
				currentBookWithKeywords = responseMap.get(bookId);
				currentBookWithKeywords.setKeywords(new LinkedHashSet<>());
			}
			currentBookWithKeywords.getKeywords().add(keywordWithBookDto.getKeyword());
		}

		// 최종
		return RecommendDto.Response.builder()
			.pageInfo(new PageInfoDto(bookIds))
			.list(responseMap.values().stream().toList())
			.build();

	}

	public ListDto<RecommendDto.CategoryWithKeywords> getTrendCategories() {
		List<TrendCategory> categories = trendCategoryRepository.findAll();
		List<RecommendDto.CategoryWithKeywords> list = categories.stream()
			.map(x -> RecommendDto.CategoryWithKeywords.builder().trendCategoryId(x.getId()).name(x.getName()).build())
			.toList();
		return new ListDto<>(list);
	}

	public ListDto<RecommendDto.CategoryWithKeywords> getTrendCategoriesWithKeywords(LocalDate targetDate) {
		LocalDateTime todayStart = LocalDateTime.of(targetDate, LocalTime.MIN);
		LocalDateTime todayEnd = LocalDateTime.of(targetDate, LocalTime.MAX);

		// 나중에 날짜 조정할 일 있을까봐 만들어둠
		LocalDateTime startOfDay = todayStart.minusDays(0L);
		LocalDateTime endOfDay = todayEnd.minusDays(0L);

		List<TrendCategoryWithKeywordDto> categoryWithKeywordDtos = trendCategoryRepository.findTrendCategoriesWithKeywordsBetween(
			startOfDay, endOfDay);

		List<RecommendDto.CategoryWithKeywords> list = categoryWithKeywordDtos.stream()
			.collect(Collectors.groupingBy(TrendCategoryWithKeywordDto::getTrendCategoryId))
			.entrySet().stream()
			.map(entry -> {
				TrendCategoryWithKeywordDto firstDto = entry.getValue().get(0);
				List<KeywordDto.Response> keywords = entry.getValue().stream()
					.filter(dto -> dto.getKeywordId() != null) // keywordId가 null이 아닌 경우만 필터링
					.map(dto -> new KeywordDto.Response(
						dto.getKeywordId(), dto.getName(), dto.getClickCount(),
						dto.getRanking()))
					.toList();
				return new RecommendDto.CategoryWithKeywords(firstDto.getTrendCategoryId(),
					firstDto.getTrendCategoryName(), keywords);
			})
			.toList();

		return new ListDto<>(list);
	}
}
