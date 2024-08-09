package com.yes.trend.api.search.service;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.querydsl.core.BooleanBuilder;
import com.yes.trend.api.search.dto.SearchDto;
import com.yes.trend.common.dto.ListDto;
import com.yes.trend.common.dto.PageInfoDto;
import com.yes.trend.common.service.ExternalApiService;
import com.yes.trend.domain.book.dto.BookDto;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.book.entity.QBook;
import com.yes.trend.domain.book.mapper.BookMapper;
import com.yes.trend.domain.book.repository.BookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SearchService {
	private final BookRepository bookRepository;
	private final BookMapper bookMapper;
	private final ExternalApiService externalApiService;

	@Value("${DOMAIN.PYTHON}")
	private String pythonUrl;

	public SearchDto.Response searchBooks(String title, String category, int page, int size) {
		QBook qBook = QBook.book;
		BooleanBuilder builder = new BooleanBuilder();

		if (category != null) {
			builder.and(qBook.categoryName.eq(category));
		}

		if (title != null) {
			builder.and(qBook.productName.contains(title));
		}

		Pageable pageable = PageRequest.of(page, size);

		Page<Book> books = bookRepository.findAll(builder, pageable);

		PageInfoDto pageInfoDto = new PageInfoDto(books);
		List<BookDto.Response> list = books.toList().stream().map(b -> bookMapper.BookToDto(b)).toList();
		return SearchDto.Response.builder().pageInfo(pageInfoDto).list(list).build();
	}

	public ListDto<BookDto.Response> liveSearch(String sentence) {

		String apiUrl = pythonUrl + "/fastapi/book/live/v2/springboot";
		// 문장을 URL 인코딩
		String encodedSentence = URLEncoder.encode(sentence, StandardCharsets.UTF_8);

		UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
			.queryParam("search_sentence", encodedSentence)
			.build(true);
		URI uri = uriBuilder.toUri();
		Map<String, Object> result = externalApiService.sendGetRequest(uri, Map.class);
		List<Integer> productList = (List<Integer>)result.get("result");
		List<Book> books = bookRepository.findByProductIds(productList);

		// 결과를 productIds 순서대로 정렬
		books.sort((b1, b2) -> {
			int index1 = productList.indexOf(b1.getProductId());
			int index2 = productList.indexOf(b2.getProductId());
			return Integer.compare(index1, index2);
		});

		return new ListDto<>(books.stream().map(bookMapper::BookToDto).toList());
	}
}
