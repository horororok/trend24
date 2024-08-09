package com.yes.trend.common.util;

public class NumberUtil {

	/**
	 * 1글자 이상이고 문자열이 1 이상의 정수인지 확인
	 *
	 * @param numberString 검사할 문자열
	 * @return 1 이상의 정수이면 true, 아니면 false
	 */
	public static boolean isOver1(String numberString) {

		return numberString != null && numberString.matches("[1-9]\\d*");
	}

	/**
	 * 문자열이 0 이상의 정수인지 확인
	 *
	 * @param numberString 검사할 문자열
	 * @return 0 이상의 정수이면 true, 아니면 false
	 */
	public static boolean isOver0(String numberString) {
		return numberString != null && numberString.matches("\\d+") && !numberString.startsWith("-");
	}
}
