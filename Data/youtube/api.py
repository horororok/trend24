# 유튜브 데이터
import requests
from youtube_transcript_api import YouTubeTranscriptApi
import json

from dotenv import load_dotenv
import os
from datetime import datetime

from konlpy.tag import Komoran
from collections import Counter
import networkx as nx

# .env 파일 로드
load_dotenv()
API_KEY = os.getenv("API_KEY")

# 형태소분석
def extract_keywords_textrank(sentence):
    komoran = Komoran()
    # 형태소 분석하여 명사만 추출
    nouns = komoran.nouns(sentence)
    # 빈도수 계산
    counter = Counter(nouns)

    # 그래프 생성
    g = nx.Graph()
    for noun, freq in counter.items():
        g.add_node(noun, weight=freq)

    # 문장을 형태소 단위로 분리
    morphemes = komoran.morphs(sentence)
    # 문장에서 명사들에 대해 그래프에 에지 추가
    for i, src in enumerate(morphemes):
        if src in counter:
            for j in range(i+1, len(morphemes)):
                dst = morphemes[j]
                if dst in counter:
                    g.add_edge(src, dst)

    # TextRank 알고리즘을 이용한 랭킹 계산
    ranking = nx.pagerank(g, weight='weight')

    # 랭킹을 기준으로 상위 키워드 추출
    keywords = [node for node, rank in sorted(ranking.items(), key=lambda x: -x[1]) if len(node) >= 2]

    return keywords

def filter_unicode_characters(text):
    filtered_chars = []
    for char in text:
        code_point = ord(char)
        # 영어 대소문자 범위
        if 0x0041 <= code_point <= 0x005A or 0x0061 <= code_point <= 0x007A:
            filtered_chars.append(char)
        # 한글 자모 및 음절 범위
        elif 0x1100 <= code_point <= 0x11FF or 0x3130 <= code_point <= 0x318F or 0xAC00 <= code_point <= 0xD7AF:
            filtered_chars.append(char)
        # 숫자 및 일반 특수문자 범위
        elif (0x0030 <= code_point <= 0x0039) or (0x0020 <= code_point <= 0x0040) or (
                0x005B <= code_point <= 0x0060) or (0x007B <= code_point <= 0x007E):
            filtered_chars.append(char)
    return ''.join(filtered_chars)

my_video_list = []


# **유튜브 자막 가져오기**
# 모든 동영상의 자막을 합쳐서 하나의 텍스트로 만드는 함수
def download_script_json(video_id):  # 매개변수 이름 변경
    all_text = ""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['ko', 'en'])
        text = ' '.join([line['text'] for line in transcript])
        all_text += text + " "
    except Exception as e:
        print(f"Error occurred while processing video {video_id}: {e}")
    return all_text


# 모든 자막을 합쳐서 하나의 텍스트로 만듭니다.
# combined_text = download_script_json(my_video_list)
# print("Combined text:", combined_text)
# def download_script_json(video_id):
#     transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['ko', 'en'])
#     # 자막 데이터를 JSON 파일로 저장
#     with open(f'script_{video_id}.json', 'w', encoding='utf-8') as json_file:
#         json.dump(transcript, json_file, ensure_ascii=False, indent=4)
#     print(f"자막 데이터가 'script_{video_id}.json' 파일로 저장되었습니다.")


# **키워드에 해당하는 전체 동영상 가져오기**
def get_search_keyword_by_hashtag(API_KEY, hashtag, collect_today, country_code='KR', max_results=10):
    print(f'==========={hashtag}===========')
    my_contents = []
    base_url = 'https://www.googleapis.com/youtube/v3/search'
    params = {
        'key': API_KEY,
        'part': 'snippet',
        'q': hashtag,  # 검색할 키워드
        'maxResults': max_results
    }


    # today = datetime.now().strftime("%Y-%m-%d") # 오늘날짜 데이터 가져오기
    # today = "2024-05-01" # 오늘날짜 데이터 가져오기 예시 TEST
    today = collect_today
    print(today)

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        videos = data.get('items', [])
        for video in videos:
            title = video['snippet']['title']
            title = filter_unicode_characters(title)
            description = video['snippet']['description']
            description = filter_unicode_characters(description)
            date = video['snippet']['publishedAt'][:10]
            date = filter_unicode_characters(date)

            if date!=today or type(video['id']) is not dict or (video['id'].get('videoId') is None): #오늘날짜가 아니거나 비디오 아이디가 없을 시 continue
                continue

            id = video['id']['videoId']  # ID 필터링 부분 제거
            my_contents += ' ' + title
            my_video_list.append(title)
            my_scripts = download_script_json(id)
            my_scripts = my_scripts.replace("[음악]", "") # [음악] 자막 없애기
            my_scripts = my_scripts.replace("[박수]", "") # [박수] 자막 없애기

            result_morpheme_description = extract_keywords_textrank("".join(description)) #형태소 분석
            result_morpheme_scripts = extract_keywords_textrank("".join(my_scripts)) #형태소 분석

            print(f'- hashtag:{hashtag} // id:{id} // data:{date} // title:{title} // desciption:{result_morpheme_description} // scripts:{result_morpheme_scripts} ')

    else:
        print('Error occurred while fetching data')

    return my_contents


date_list = ["2024-05-01", "2024-05-02", "2024-05-03", "2024-05-04", "2024-05-05"]

for collect_date in date_list:
    playlist_list = get_search_keyword_by_hashtag(API_KEY, "#골라듄다큐", collect_date)
    playlist_list = get_search_keyword_by_hashtag(API_KEY, "#잇섭", collect_date)
    playlist_list = get_search_keyword_by_hashtag(API_KEY, "#크랩", collect_date)
    playlist_list = get_search_keyword_by_hashtag(API_KEY, "#동물의왕국", collect_date)


# if __name__ == '__main__':
#     download_script_json()

