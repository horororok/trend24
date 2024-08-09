package com.yes.trend.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes.trend.common.costants.ErrorCode;
import com.yes.trend.common.costants.SuccessCode;
import com.yes.trend.common.dto.ApiResponse;
import com.yes.trend.common.exception.CustomException;
import com.yes.trend.hello.dto.HelloDto;

@RestController
@RequestMapping("hello")
public class HelloController {

	@GetMapping("/")
	public ApiResponse<HelloDto.Response> getHello() {
		String returnData = "Hello World!";
		HelloDto.Response dto = new HelloDto.Response(returnData);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, dto);
	}

	@GetMapping("/query")
	public ApiResponse<HelloDto.Response> getHello(@RequestParam String key) {
		HelloDto.Response dto = new HelloDto.Response("쿼리 스트링: " + key);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, dto);
	}

	@GetMapping("/path/{id}")
	public ApiResponse<HelloDto.Response> getHelloPath(@PathVariable String id) {
		HelloDto.Response dto = new HelloDto.Response("path variable: " + id);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, dto);
	}

	@PostMapping("/world")
	public ApiResponse<HelloDto.Response> postHello(@RequestBody HelloDto.Request request) {
		HelloDto.Response dto = new HelloDto.Response("당신이 보낸 것: " + request.getHello());
		return ApiResponse.success(SuccessCode.POST_SUCCESS, dto);
	}

	@GetMapping("/error")
	public ApiResponse<HelloDto.Response> errorHello() {
		String errorData = "에러 예제";
		throw new CustomException(ErrorCode.BAD_PARAMETER, errorData);
	}
}
