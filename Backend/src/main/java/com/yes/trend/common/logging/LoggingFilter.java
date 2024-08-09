package com.yes.trend.common.logging;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Enumeration;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yes.trend.common.dto.ApiResponse;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class LoggingFilter extends OncePerRequestFilter {
	protected static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

	private boolean isSwagger = false;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		StringBuilder stringBuilder = new StringBuilder();

		stringBuilder.append("time: ").append(LocalDateTime.now()).append("\n");

		MDC.put("traceId", UUID.randomUUID().toString());
		stringBuilder.append("traceId: ").append(MDC.get("traceId")).append("\n");

		try {
			if (isAsyncDispatch(request)) {
				filterChain.doFilter(request, response);
			} else if (request.getContentType() != null && request.getContentType().contains("multipart/form-data")) {
				doFilterWrapped(request, new ResponseWrapper(response), filterChain, stringBuilder);
			} else {
				doFilterWrapped(new RequestWrapper(request), new ResponseWrapper(response), filterChain, stringBuilder);
			}
		} catch (Exception ex) {
			handleException(ex, response, stringBuilder);
		} finally {
			MDC.clear();
		}
	}

	protected void doFilterWrapped(HttpServletRequest request, ContentCachingResponseWrapper response,
		FilterChain filterChain, StringBuilder stringBuilder) throws ServletException, IOException {
		try {
			logRequest(request, stringBuilder);
			if (!isSwagger) {
				stringBuilder.append("\n");
				log.info(stringBuilder.toString());
				stringBuilder.setLength(0);
			}
			filterChain.doFilter(request, response);
		} catch (Exception ex) {
			handleException(ex, response, stringBuilder);
			throw ex; // Re-throw the exception to propagate it to the outer catch block
		} finally {
			logResponse(response, stringBuilder);
			if (!isSwagger) {
				log.info(stringBuilder.append("\n").toString());
			}
			response.copyBodyToResponse();
		}
	}

	private void logMultipartRequest(HttpServletRequest request, StringBuilder stringBuilder) throws
		ServletException,
		IOException {
		Collection<Part> parts = request.getParts();
		StringBuilder multipartPayload = new StringBuilder();

		// 각 파트에서 필요한 작업 수행
		for (Part part : parts) {
			String paramName = part.getName();

			// 파일 파트인 경우
			if (part.getContentType() != null) {
				String fileName = part.getSubmittedFileName();
				// 파일 처리 로직
				multipartPayload.append(paramName).append(": ").append(fileName).append("\n");
			}
			// 텍스트 파트인 경우
			else {
				String paramValue = request.getParameter(paramName);
				// 텍스트 파트 처리 로직
				multipartPayload.append(paramName).append(": ").append(paramValue).append("\n");
			}
		}

		stringBuilder.append("Multipart Request")
			.append(" Payload: ****\n")
			.append(multipartPayload.toString())
			.append("****\n");
	}

	private void logRequest(HttpServletRequest request, StringBuilder stringBuilder) throws
		IOException,
		ServletException {
		String queryString = request.getQueryString();

		Enumeration<String> headerNames = request.getHeaderNames();
		StringBuilder headersInfo = new StringBuilder();
		while (headerNames.hasMoreElements()) {
			String headerName = headerNames.nextElement();
			String headerValue = request.getHeader(headerName);
			headersInfo.append(headerName).append(": ").append(headerValue).append("\n");
		}
		String logMessage = String.format("Request : %s uri=[%s] content-type=[%s], headers = [%s]",
			request.getMethod(),
			queryString == null ? request.getRequestURI() : request.getRequestURI() + queryString,
			request.getContentType(), headersInfo);

		isSwagger = false;
		String[] swaggerUris = {"swagger", "api-docs"};
		for (String swaggerUri : swaggerUris) {
			if (request.getRequestURI().contains(swaggerUri)) {
				isSwagger = true;
				return;
			}
		}

		stringBuilder.append("Origin: ").append(request.getHeader("Origin")).append("\n");
		stringBuilder.append(logMessage).append("\n");

		if (request.getContentType() != null && request.getContentType().contains("multipart/form-data")) {
			logMultipartRequest(request, stringBuilder);
		} else if (request.getRequestURI().contains("auth")) {
			// 비밀번호 포함이므로 내용 로깅 안 함
			return;
		} else {

			logPayload("Request", request.getContentType(), request.getInputStream(), stringBuilder);
		}

	}

	private void logResponse(ContentCachingResponseWrapper response, StringBuilder stringBuilder) throws IOException {
		if (isSwagger) {
			return;
		}
		String logMessage = String.format("Response : %s", response.getStatus());
		stringBuilder.append(logMessage).append("\n");
		logPayload("Response", response.getContentType(), response.getContentInputStream(), stringBuilder);
	}

	private void logPayload(String prefix, String contentType, InputStream inputStream,
		StringBuilder stringBuilder) throws IOException {
		boolean visible = isVisible(MediaType.valueOf(contentType == null ? "application/json" : contentType));
		int maxLength = 1900; // 스트링빌더 최대 길이

		if (visible) {
			byte[] content = StreamUtils.copyToByteArray(inputStream);
			stringBuilder.append(prefix).append(" Payload:");
			if (content.length > 0) {
				String contentString = new String(content);
				// 현재 스트링빌더에 있는 텍스트의 길이 확인
				int currentLength = stringBuilder.length();
				if (currentLength < maxLength) {
					int remainingLength = maxLength - currentLength; // 남은 길이 계산

					if (contentString.length() <= remainingLength) {
						// contentString이 남은 길이보다 작거나 같으면 전체 추가
						stringBuilder.append(contentString).append("\n");
					} else {
						// contentString이 남은 길이보다 크면 잘라서 추가
						stringBuilder.append(contentString, 0, remainingLength).append("\n");
					}
				}
			}

		} else {
			stringBuilder.append(prefix).append(" Payload: Binary Content").append("\n");
		}
	}

	private boolean isVisible(MediaType mediaType) {
		final List<MediaType> VISIBLE_TYPES = Arrays.asList(MediaType.valueOf("text/*"),
			MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML,
			MediaType.valueOf("application/*+json"), MediaType.valueOf("application/*+xml"));
		return VISIBLE_TYPES.stream().anyMatch(visibleType -> visibleType.includes(mediaType));
	}

	private void handleException(Exception ex, HttpServletResponse response, StringBuilder stringBuilder) throws
		IOException {
		log.error("Exception during request processing", ex);
		String logMessage = String.format("[ERROR] : %s", ex.getMessage() + "\n\n" + ex.getStackTrace());
		stringBuilder.append(logMessage).append("\n");
		ApiResponse<?> errorResponse = ApiResponse.globalError(HttpStatus.BAD_REQUEST, ex.getMessage());
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonResponse = objectMapper.writeValueAsString(errorResponse);
		// Customize the response based on the exception
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonResponse);

	}
}
