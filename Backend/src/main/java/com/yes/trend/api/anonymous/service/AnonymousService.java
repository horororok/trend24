package com.yes.trend.api.anonymous.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yes.trend.api.anonymous.dto.AnonymousDto;
import com.yes.trend.api.anonymous.repository.WordCloudRepository;
import com.yes.trend.api.recommend.dto.RecommendDto;
import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.book.mapper.BookMapper;
import com.yes.trend.domain.book.repository.BookRepository;
import com.yes.trend.domain.bookclick.entity.BookClick;
import com.yes.trend.domain.bookclick.repository.BookClickRepository;
import com.yes.trend.domain.keyword.repository.KeywordRepository;
import com.yes.trend.domain.keywordclick.entity.KeywordClick;
import com.yes.trend.domain.keywordclick.repository.KeywordClickRepository;
import com.yes.trend.domain.trendcategory.entity.TrendCategory;
import com.yes.trend.domain.trendcategory.repository.TrendCategoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnonymousService {
	private final BookRepository bookRepository;
	private final BookClickRepository bookClickRepository;
	private final TrendCategoryRepository trendCategoryRepository;
	private final KeywordClickRepository keywordClickRepository;
	private final KeywordRepository keywordRepository;
	private final BookMapper bookMapper;
	private final WordCloudRepository wordCloudRepository;

	@Transactional
	public AnonymousDto.BookKeywordsClickCountDto postBookKeywordClickCount(Integer bookId, Byte categoryId,
		List<String> keywordNames) {
		// 값 검증
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException(ErrorCode.NO_BOOK, bookId));
		TrendCategory trendCategory = trendCategoryRepository.findById(categoryId)
			.orElseThrow(() -> new CustomException(ErrorCode.NO_TREND_CATEGORY, categoryId));

		// 오늘 날짜
		LocalDateTime todayStart = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
		LocalDateTime todayEnd = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

		// 오늘의 책 클릭 업데이트
		BookClick bookClick = bookClickRepository.findByBookIdAndCreatedTimeBetween(bookId, todayStart, todayEnd)
			.orElseGet(() -> new BookClick(book));
		bookClick.addClickCount();
		bookClickRepository.save(bookClick);

		List<String> wrongKewordNames = new ArrayList<>();

		List<AnonymousDto.KeywordClickDto> keywordDtos = new ArrayList<>();
		// 키워드이름마다 이름 & 카테고리 조합으로 클릭 엔티티 찾기
		for (String keywordName : keywordNames) {
			if (!keywordClickRepository.existsByBookIdAndKeywordName(bookId, keywordName)) {
				wrongKewordNames.add(keywordName);
				continue;
			}
			KeywordClick keywordClick = keywordClickRepository.findByKeywordNameAndCategory_IdAndCreatedTimeBetween(
					keywordName, categoryId, todayStart, todayEnd)
				.orElseGet(() -> new KeywordClick(keywordName, trendCategory));
			keywordClick.addClickCount();
			keywordClick = keywordClickRepository.save(keywordClick);
			keywordDtos.add(AnonymousDto.KeywordClickDto.builder()
				.keywordClickId(keywordClick.getId())
				.name(keywordClick.getKeywordName())
				.clickCount(keywordClick.getClickCount())
				.trendCategoryName(trendCategory.getName())
				.build());
		}

		if (!wrongKewordNames.isEmpty()) {
			throw new CustomException(ErrorCode.NO_MATCHING_KEYWORD_NAME_AND_BOOK_ID, wrongKewordNames);
		}

		return new AnonymousDto.BookKeywordsClickCountDto(book.getId(), bookClick.getCount(), keywordDtos);
	}

	@Transactional(readOnly = true)
	public ListDto<AnonymousDto.KeywordsAndBooksByCategory> getKeywordsAndBooksByCategory(Byte categoryId, int size,
		LocalDate startDate) {

		List<AnonymousDto.BookWithKeywordNamesByCategory> booksAndKeywordsByCategories = wordCloudRepository.findBooksAndKeywordsByCategories(
			startDate, size);
		List<AnonymousDto.KeywordFrequencyByCategory> keywordFrequencyByCategories = wordCloudRepository.findKeywordsFrequencyByCategories(
			startDate);

		Map<String, AnonymousDto.KeywordsAndBooksByCategory> resultMap = new HashMap<>();

		// 키워드 리스트 만들기
		for (AnonymousDto.KeywordFrequencyByCategory keyword : keywordFrequencyByCategories) {
			// 키가 없다면 만들기
			if (!resultMap.containsKey(keyword.getCategoryName())) {
				AnonymousDto.KeywordsAndBooksByCategory categoryDto = new AnonymousDto.KeywordsAndBooksByCategory(
					keyword.getCategoryName());
				resultMap.put(keyword.getCategoryName(), categoryDto);
			}
			AnonymousDto.KeywordsAndBooksByCategory categoryDto = resultMap.get(keyword.getCategoryName());
			AnonymousDto.KeywordWithFrequency keywordDto = new AnonymousDto.KeywordWithFrequency(
				keyword.getKeywordName(), keyword.getFreq());
			categoryDto.getKeywords().add(keywordDto);
		}

		// 책 리스트 만들기
		for (AnonymousDto.BookWithKeywordNamesByCategory book : booksAndKeywordsByCategories) {
			// 키가 없다면 만들기
			if (!resultMap.containsKey(book.getTrendCategoryName())) {
				AnonymousDto.KeywordsAndBooksByCategory categoryDto = new AnonymousDto.KeywordsAndBooksByCategory(
					book.getTrendCategoryName());
				resultMap.put(book.getTrendCategoryName(), categoryDto);
			}

			AnonymousDto.KeywordsAndBooksByCategory trendCategoryDto = resultMap.get(book.getTrendCategoryName());
			RecommendDto.BookWithKeywords bookDto = new RecommendDto.BookWithKeywords(book.getBookId(),
				book.getProductId(), book.getProductName(), book.getCategoryName(),
				book.getSearchKeyword(), book.getTotalClickCount(), book.getTotalOrderCount(),
				book.getTotalOrderAmount(), book.getSalePrice(), book.getContents(), book.getTotalPurchaseCount());

			// 키워드 3개만 남기기
			StringTokenizer stringTokenizer = new StringTokenizer(book.getKeywordNames(), ",");
			final int keywordMaxCount = 3;
			for (int i = 0; i < keywordMaxCount; i++) {
				if (stringTokenizer.hasMoreTokens()) {
					bookDto.getKeywords().add(stringTokenizer.nextToken());
				}
			}

			// 책 추가
			trendCategoryDto.getBooks().add(bookDto);

		}

		// 결과
		List<AnonymousDto.KeywordsAndBooksByCategory> resultList = new ArrayList<>(resultMap.values());

		return new ListDto<>(resultList);

	}

	public LocalDate getTrendSearchStartDate() {
		return LocalDate.now().minusWeeks(1L);
	}
}
