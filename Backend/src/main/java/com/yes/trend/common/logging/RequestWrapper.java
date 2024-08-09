package com.yes.trend.common.logging;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.util.StreamUtils;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestWrapper extends HttpServletRequestWrapper {

	private byte[] cachedInputStream;

	public RequestWrapper(HttpServletRequest request) throws IOException {
		super(request);
		InputStream requestInputStream = request.getInputStream();
		this.cachedInputStream = StreamUtils.copyToByteArray(requestInputStream);
	}

	@Override
	public ServletInputStream getInputStream() {
		return new ServletInputStream() {
			private InputStream cachedBodyInputStream = new ByteArrayInputStream(cachedInputStream);

			@Override
			public boolean isFinished() {
				try {
					return cachedBodyInputStream.available() == 0;
				} catch (IOException e) {
					log.error(String.valueOf(e));
				}
				return false;
			}

			@Override
			public boolean isReady() {
				return true;
			}

			@Override
			public void setReadListener(ReadListener readListener) {
				throw new UnsupportedOperationException();
			}

			@Override
			public int read() throws IOException {
				return cachedBodyInputStream.read();
			}
		};
	}
}
