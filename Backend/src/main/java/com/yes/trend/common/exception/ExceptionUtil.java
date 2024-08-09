package com.yes.trend.common.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class ExceptionUtil {
	private final StringBuilder sb = new StringBuilder();

	public static String exceptionToString(Exception ex) {
		StringWriter sw = new StringWriter();
		ex.printStackTrace(new PrintWriter(sw));
		return sw.toString();
	}

}

