package com.yes.trend.api.status.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.yes.trend.common.dto.ListDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class StatusDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class WeeklyTopClickedBooksDto {
		private Integer bookId;
		private Integer clickCountSum;
		private String productName;
		private Integer ranking;
		private ListDto<BookClickDto> weeklyClickCount;

	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class BookClickDto {
		private LocalDate date;
		private Integer count;
	}

	@Getter
	@NoArgsConstructor
	public static class TopClickedKeywordsDto {
		private List<CategoryDto> categories = new ArrayList<>();
		private String keywordName;
		private Integer clickCountSum;

		@Builder
		public TopClickedKeywordsDto(List<CategoryDto> categories, String keywordName, Long clickCountSum) {
			this.categories = categories;
			this.keywordName = keywordName;
			this.clickCountSum = clickCountSum.intValue();
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class CategoryDto {
		private String trendCategoryName;

		@Override
		public boolean equals(Object o) {
			if (this == o)
				return true;
			if (o == null || getClass() != o.getClass())
				return false;
			CategoryDto that = (CategoryDto)o;
			return Objects.equals(trendCategoryName, that.trendCategoryName);
		}

		@Override
		public int hashCode() {
			return Objects.hash(trendCategoryName);
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class KeywordClickDto {
		private LocalDate date;
		private Boolean trend;
	}

}
