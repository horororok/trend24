# Trend24

![project title.png](readme_images/gifLogo3.gif)

## 프로젝트 소개

> - YES24 기업연계 프로젝트
> - SNS/쇼츠와 같은 다양한 미디어를 통해 최신 이슈와 트렌드를 수집하고, 이를 바탕으로 최신의 이슈 및 트렌드와 관련된 도서를 고객이나 도서 MD에게 제공해주는 서비스

> 프로젝트 주제 배경
> ---
> 최근 SNS와 동영상 플랫폼 등 다양한 미디어 채널을 통해 사회 전반의 이슈와 트렌드가 빠르게 확산되고 있다.<br>
> 하지만 이러한 실시간 정보를 체계적으로 수집하고 관련 도서를 찾는 것은 쉽지 않다. <br>
> 이에 따라 도서 MD나 일반 독자들이 최신 이슈와 트렌드에 관한 정보를 손쉽게 얻고, 관련 도서를 추천받을 수 있는 시스템의 필요성이 대두되고 있다.<br>
> 이에 본 프로젝트에서는 SNS, 동영상 플랫폼 등 다양한 미디어 채널의 실시간 정보를 수집하고 분석하여, 이슈와 트렌드에 따른 도서 정보를 제공하는 서비스를 개발하고자 한다.<br>
> <br>

## 개발 기간 및 프로젝트 관리
| 제목 | 내용 |
| :-----: | :-----:|
| 프로젝트 기간 | 2024.04.11 ~ 2024.05.20 |
| 프로젝트 관리 툴 | ![Static Badge](https://img.shields.io/badge/-JIRA-blue?style=plastic&logo=jira) ![Static Badge](https://img.shields.io/badge/-GitLab-gray?style=plastic&logo=gitlab) ![Static Badge](https://img.shields.io/badge/-Notion-black?style=plastic&logo=notion) |

## 프로젝트 링크

[![Static Badge](https://img.shields.io/badge/Service%20Web-User%20page-brightgreen?style=plastic&logo=googlechrome&logoColor=brightgreen&logoSize=auto&cacheSeconds=3600&link=https%3A%2F%2Ftrend24.live%2Fevent)](https://trend24.live/event) [![Static Badge](https://img.shields.io/badge/Service%20Web-MD%20page-brightgreen?style=plastic&logo=googlechrome&logoColor=brightgreen&logoSize=auto&cacheSeconds=3600&link=https%3A%2F%2Ftrend24.live%2Fmain)](https://trend24.live)

[![Figma link](https://img.shields.io/badge/-Figma-skyblue?style=plastic&logo=figma&logoColor=white&logoSize=auto&cacheSeconds=3600)](https://www.figma.com/file/ZI90ZvwRBuOURdbeRRrTZ3/Untitled?type=design&node-id=0%3A1&mode=dev&t=qu79zizJEmh0AxyR-1) 
[![API docs link](https://img.shields.io/badge/-API%20Docs-black?style=plastic&logo=notion&logoColor=white&logoSize=auto&cacheSeconds=3600)](https://forested-danthus-512.notion.site/API-87ad1f831a2744cc8dfffe5dc3d95646)


## ERD
![erd.png](readme_images/erd.png)

## Project Architecture
![architecture.png](readme_images/architecture.png)

## 팀원
![자율 팀원 사진.png](readme_images/TeamMember.png)

# 서비스 및 기능 소개

## MD 페이지

| **로그인 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/로그인화면.gif" alt="image" width="700"></div> |
- 등록된 아이디와 비밀번호를 통해 MD 계정에 로그인 가능합니다.

| **인기 트렌드** |
| :-----: |
| <div align="center"><img src="readme_images/인기트랜드.gif" alt="image" width="700"></div> |
- 날짜 별 주요 키워드 확인 가능합니다.
- 키워드에 마우스 포인터를 올리면 해당 티워드가 나온 다른 날짜를 확인 가능합니다.
- 키워드를 틀릭하면 관련 추천 도서 및 정보를 확인 가능합니다.

| **트렌드 조회** |
| :-----: |
| <div align="center"><img src="readme_images/트랜드조회.gif" alt="image" width="700"></div> |
- 날짜와 카테고리, 키워드를 자유롭게 선택 가능합니다.
- 선택한 키워드와 관련된 추천 도서들을 확인 가능합니다.

| **유저 통계** |
| :-----: |
| <div align="center"><img src="readme_images/유저통계2.gif" alt="image" width="700"></div> |
- 웹 사용자의 이용 데이터를 그래프와 표 등으로 확인 가능합니다.

| **도서 검색 - 제목으로 검색** |
| :-----: |
| <div align="center"><img src="readme_images/도서 검색.gif" alt="image" width="700"></div> |
- 찾고자 하는 도서의 카테고리를 선택할 수 있습니다.
- 도서를 제목 검색을 통해 찾을 수 있습니다.

| **도서 검색 - 문장으로 검색** |
| :-----: |
| <div align="center"><img src="readme_images/도서 문장.gif" alt="image" width="700"></div> |
- 원하는 문장을 자유롭게 작성하여 문장과 관련된 책을 검색합니다.

| **서랍** |
| :-----: |
| <div align="center"><img src="readme_images/서랍2.gif" alt="image" width="700"></div> |
- 키워드 추가를 통해 원하는 도서 서랍을 생성 가능합니다.
- 인기 트랜드, 트랜드 조회, 도서 검색에서 저장한 도서를 확인 가능합니다.

| **커스텀 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/커스텀 페이지2.gif" alt="image" width="700"></div> |
- 편집을 통해 원하는 위젯을 선택하여 자신만의 커스텀 페이지를 제작할 수 있습니다.

## 유저 페이지

| **서비스 선택 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/유저 메인.gif" alt="image" width="700"></div> |
- 오른쪽 메뉴바를 통해 트랜드별 추천 또는 추억 여행를 선택 가능합니다.
- 로켓을 클릭하여 서비스 페이지에 입장 가능합니다.

| **트렌드별 추천 화면 - 메인 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/유저 일반 메인.gif" alt="image" width="700"></div> |
- 별을 골라 원하는 카테고리의 상세 페이지에 입장 가능합니다.

| **트렌드별 추천 화면 - 상세 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/유저 일반 상세.gif" alt="image" width="700"></div> |
- 워드 클라우드를 통해 카테고리의 키워드를 확인 가능합니다.
- 키워드 추천 책 소개를 통해 책의 상세 정보를 확인 가능합니다.

| **추억 여행 - 메인 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/유저 추억 메인.gif" alt="image" width="700"></div> |
- 원하는 질문을 선택하여 서비스를 이용할 수 있습니다.
- 질문에 대한 답변 도서를 제목 검색 또는 다른 사용자들의 선택 도서 목록을 통해 선택 가능합니다.

| **추억 여행 - 상세 페이지** |
| :-----: |
| <div align="center"><img src="readme_images/유저 추억 상세.gif" alt="image" width="700"></div> |
- 답변한 도서의 정보와 다른 사용자들의 답변들 중에서 유사한 도서들을 확인 가능합니다.


<hr style="height: 2px; background-color: rgba(135, 206, 235, 0.5); border: none;">

## 개발 환경 및 기술 스택

| 부서 | 개발 환경 및 기술 스택 |
| :-----: | :-----:|
| Front End | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) |
| Back End | ![Java](https://img.shields.io/badge/java:17-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/springboot:3.2.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![Spring Security](https://img.shields.io/badge/spring%20security-6DB33F.svg?&style=for-the-badge&logo=springsecurity&logoColor=white) ![JPA](https://img.shields.io/badge/%20-Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=none) ![QueryDSL](https://img.shields.io/badge/querydsl:5.0.0-0078C0.svg?&style=for-the-badge) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) 	![Python](https://img.shields.io/badge/python:3.7-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI:0.103.2-005571?style=for-the-badge&logo=fastapi) |
| Data | ![Static Badge](https://img.shields.io/badge/%20-Kiwi-green?style=for-the-badge&logo=none) ![Static Badge](https://img.shields.io/badge/%20-TextRank-blue?style=for-the-badge&logo=none) ![Static Badge](https://img.shields.io/badge/%20-SentenceBERT-green?style=for-the-badge&logo=none) ![Static Badge](https://img.shields.io/badge/%20-Qdrant-red?style=for-the-badge&logo=none) ![Static Badge](https://img.shields.io/badge/%20-OpenAPI-skyblue?style=for-the-badge&logo=none) |
| Infra | ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white) |
