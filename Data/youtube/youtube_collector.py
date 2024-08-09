import os
import requests
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from datetime import datetime, timedelta
from konlpy.tag import Komoran
from collections import Counter
import networkx as nx
from kiwipiepy import Kiwi
from googleapiclient.discovery import build

class YouTubeColletor:
    def __init__(self):
        load_dotenv()
        self.api_key = []
        self.api_key.append(os.getenv("API_KEY_2"))
        self.api_key.append(os.getenv("API_KEY_1"))

        self.api_key_idx = 0
        self.komoran = Komoran()
        self.stopword_set = self.load_stopword()

    def load_stopword(self):
        stopword_set = set([])

        file_path = "C:/Users/SSAFY/jupyter/S10P31S203/pycharmDirectory/youtube/stopword.txt"
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                # 줄바꿈 문자 제거 및 공백 제거
                word = line.strip()
                # 단어가 비어 있지 않은 경우 리스트에 추가
                if word:
                    stopword_set.add(word)

        return stopword_set

    #특수 문자 및 이모티콘 제거
    def filter_unicode_characters(self, text):
        filtered_chars = [char for char in text if 0x0041 <= ord(char) <= 0x005A or#영어 소문자
                          0x0061 <= ord(char) <= 0x007A or#영어 대문자
                          0x1100 <= ord(char) <= 0x11FF or#한글 자모 및 음절 범위
                          0x3130 <= ord(char) <= 0x318F or
                          0xAC00 <= ord(char) <= 0xD7AF or
                          0x0030 <= ord(char) <= 0x0039 or#숫자 및 일반 특수문자 범위
                          0x0020 <= ord(char) <= 0x0040 or
                          0x005B <= ord(char) <= 0x0060 or
                          0x007B <= ord(char) <= 0x007E]
        return ''.join(filtered_chars)

    #유튜브 자막 다운로드
    def download_script_string(self, video_id):
        all_text = ""
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['ko', 'en'])
            text = ' '.join([line['text'] for line in transcript])
            all_text += text + " "
        except Exception as e:
            print(f"Error occurred while processing video {video_id}: {e}")
        return all_text

    def extract_keywords_textrank(self, sentence, max_keywords = 10, extra_stopword = []):
        kiwi = Kiwi()
        pos_tags = kiwi.analyze(sentence)[0][0]

        filtered_words = [word for word, pos, _, _ in pos_tags if
                          (pos.startswith('N') or pos.startswith('V')) and len(word) >= 2]

        counter = Counter(filtered_words)

        g = nx.Graph()
        for word, freq in counter.items():
            g.add_node(word, weight=freq)

        window_size = 4
        for i in range(len(pos_tags)):
            src = pos_tags[i][0]
            if src in counter:
                for j in range(i + 1, min(i + window_size, len(pos_tags))):
                    dst = pos_tags[j][0]
                    if dst in counter:
                        if g.has_edge(src, dst):
                            g[src][dst]['weight'] += 1
                        else:
                            g.add_edge(src, dst, weight=1)

        ranking = nx.pagerank(g, weight='weight')

        keywords = [
            node for node, rank in sorted(ranking.items(), key=lambda x: -x[1])
            if len(node) >= 2 and node not in self.stopword_set and node not in extra_stopword
        ]

        return keywords[:max_keywords]


    def get_search_keyword_by_hashtag(self, hashtag, max_results=10):
        base_url = 'https://www.googleapis.com/youtube/v3/search'
        params = {
            'key': self.api_key[self.api_key_idx],
            'part': 'snippet',
            'q': hashtag,
            'maxResults': max_results
        }

        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            data = response.json()
            videos = data.get('items', [])
            for video in videos:
                #원본 데이터 : 동영상 id, 동영상 타이틀, 스크립트 날짜
                title = self.filter_unicode_characters(video['snippet']['title'])
                description = self.filter_unicode_characters(video['snippet']['description'])
                date = video['snippet']['publishedAt'][:10]

                if 'videoId' in video['id']:
                    video_id = video['id']['videoId']
                    scripts = self.download_script_string(video_id)
                    desc_keywords = self.extract_keywords_textrank(description)
                    script_keywords = self.extract_keywords_textrank(scripts)
                    print(f'- Hashtag: {hashtag} // ID: {video_id} // Date: {date} // Title: {title} // Description Keywords: {desc_keywords} // Script Keywords: {script_keywords}')
        else:
            print('Error occurred while fetching data')

    #video_category init is Pets & Animals(15)
    def get_search_keyword_by_popular_videos(self, video_category = 15, country_code='KR', max_results=6):
        # my_contents = ''
        base_url = 'https://www.googleapis.com/youtube/v3/videos'
        params = {
            'key': self.api_key[self.api_key_idx],
            'part': 'snippet',
            'chart': 'mostPopular',
            'regionCode': country_code,
            'videoCategoryId': video_category,
            'maxResults': max_results
        }

        #DB에 저장할 원본 데이터 리스트
        popular_video_list = []

        content_keywords_list = []

        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            data = response.json()
            videos = data.get('items', [])

            cnt = 1
            for video in videos:
                # print(video)
                print(f'[{cnt}/{len(videos)}] ', end='')
                cnt += 1

                title = video['snippet']['title']
                title = self.filter_unicode_characters(title)

                script = self.download_script_string(video['id'])

                video_keywords = self.extract_keywords_textrank(title + ' ' + script)

                for kw in video_keywords:
                    if kw not in content_keywords_list:
                        content_keywords_list.append(kw)

                print(f'{title} >> {video_keywords}')

                # DB에 저장할 원본데이터
                now_video = {
                    'video_id': video['id'],
                    'title': video['snippet']['title'],
                    'published_at': video['snippet']['publishedAt'],
                    'video_keywords': video_keywords
                }

                popular_video_list.append(now_video)
        else:
            print('Error occurred while fetching data')

        return " ".join(content_keywords_list), popular_video_list


    def get_video_from_popular_videos(self, video_category, country_code='KR'):
        # my_contents = ''
        base_url = 'https://www.googleapis.com/youtube/v3/videos'
        params = {
            'key': self.api_key[self.api_key_idx],
            'part': 'snippet',
            'chart': 'mostPopular',
            'regionCode': country_code,
            'videoCategoryId': video_category,
            'maxResults': 10
        }

        # DB에 저장할 원본 데이터 리스트
        video_list = []  # <<<<<<<<<

        keyword_score = {}

        # 인기동영상만
        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            data = response.json()
            videos = data.get('items', [])
            # for video in tqdm(videos, desc="Processing"):
            cnt = 1
            for video in videos:
                # print(video)
                print(f'[{cnt}/{len(videos)}] ', end='')
                cnt += 1

                title = video['snippet']['title']
                title = self.filter_unicode_characters(title)
                print(title)

                script = self.download_script_string(video['id'])

                # 키워드 추출
                title_keywords = self.extract_keywords_textrank(title)[:3]

                script_keywords = self.extract_keywords_textrank(script)[:5]

                for idx in range(len(title_keywords)):
                    if title_keywords[idx] not in keyword_score:
                        keyword_score[title_keywords[idx]] = (3 - idx)
                    else:
                        keyword_score[title_keywords[idx]] += (3 - idx)

                for idx in range(len(script_keywords)):
                    if script_keywords[idx] not in keyword_score:
                        keyword_score[script_keywords[idx]] = (5 - idx)
                    else:
                        keyword_score[script_keywords[idx]] += (5 - idx)

                # DB에 저장할 원본데이터
                now_video = {
                    'video_id': video['id'],
                    'title': video['snippet']['title'],
                    'published_at': video['snippet']['publishedAt'],
                    'video_keywords': title_keywords + script_keywords
                }

                video_list.append(now_video)
        else:
            print('Error occurred while fetching data')

        return keyword_score, video_list

    # 특정 재생목록의 비디오 목록 조회
    def get_videos_from_playlist(self, youtube, playlist_id):
        videos = []
        next_page_token = None
        for i in range(4):
            playlist_items_response = youtube.playlistItems().list(
                playlistId=playlist_id,
                part='snippet',
                maxResults=50,
                pageToken=next_page_token
            ).execute()

            videos.extend(playlist_items_response['items'])

            next_page_token = playlist_items_response.get('nextPageToken')
            if not next_page_token:
                break

        return videos

    def get_videos_from_channel_by_num(self, youtube, channel_id, num):
        videos = []
        next_page_token = None
        while len(videos) < num:
            search_response = youtube.search().list(
                channelId=channel_id,
                part='snippet',
                maxResults=min(num - len(videos), 50),  # 최대 50개까지 요청 가능
                pageToken=next_page_token,
                order='date'  # 최신순으로 정렬
            ).execute()

            videos.extend(search_response['items'])

            next_page_token = search_response.get('nextPageToken')
            if not next_page_token:
                break

        return videos[:num]

    def get_videos_from_channel_by_date(self, youtube, channel_id, start_date, period):
        videos = []
        end_date = datetime.strptime(start_date, "%Y-%m-%d") - timedelta(days=period)
        end_date = end_date.strftime("%Y-%m-%d")

        max_attempts = 3  # 최대 재시도 횟수
        attempt = 0  # 초기 시도 횟수

        while attempt < max_attempts:
            try:
                search_response = youtube.search().list(
                    channelId=channel_id,
                    part='snippet',
                    maxResults=50,
                    publishedAfter=f"{end_date}T00:00:00Z",
                    publishedBefore=f"{start_date}T00:00:00Z",
                    order='date',
                ).execute()

                videos.extend(search_response['items'])

                break  # 성공적으로 데이터를 받아왔으므로 반복문을 빠져나옵니다.
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                attempt += 1

                if attempt == max_attempts:
                    if self.api_key_idx == 0:
                        self.api_key_idx += 1
                        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

                        attempt = 0
                        print("Change youtube API key")
                    else:
                        print("Max retry attempts reached, failing with errors.")
                        raise  # 모든 시도가 실패했을 경우 예외를 다시 발생시키고 종료

        return videos

    #category collecter part
    def get_search_NEWS_video(self, SEARCH_DATE, country_code='KR'):
        keyword_score, video_list = self.get_video_from_popular_videos(25)
        # keyword_score = {}
        # video_list = []

        CHANNELS = ['kbs', 'mbc', 'sbs']
        PLAYLIST_ID = {'kbs': 'PL9a4x_yPK_869WQIoJH6PE5j4Rg4Jfdlc', 'sbs': 'PLUHG6IBxDr3ivWScguOZ4Ikkqgm3GQnhP',
                       'mbc': 'PLoMnIlrIuxWKWYK4M98PXm_EYGndbEdu-', }
        PLAYLIST_slice_len = {'kbs': 27, 'sbs': 10, 'mbc': 22}

        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

        for channel in CHANNELS:
            videos = []
            try:
                videos = self.get_videos_from_playlist(youtube, PLAYLIST_ID[channel])
            except Exception as e:
                print(e)

            cnt = 1
            for video in videos:
                if video['snippet']['publishedAt'][:10] == SEARCH_DATE:
                    print(f'[{cnt}/{len(videos)}] ', end='')
                    cnt += 1

                    title = video['snippet']['title'][:len(video['snippet']['title']) - PLAYLIST_slice_len[channel]]
                    title = self.filter_unicode_characters(title)
                    print(title)

                    script = self.download_script_string(video['snippet']['resourceId']['videoId'])

                    # 키워드 추출
                    title_keywords = self.extract_keywords_textrank(title)[:3]

                    script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                    for idx in range(len(title_keywords)):
                        if title_keywords[idx] not in keyword_score:
                            keyword_score[title_keywords[idx]] = (3 - idx)
                        else:
                            keyword_score[title_keywords[idx]] += (3 - idx)

                    for idx in range(len(script_keywords)):
                        if script_keywords[idx] not in keyword_score:
                            keyword_score[script_keywords[idx]] = (5 - idx)
                        else:
                            keyword_score[script_keywords[idx]] += (5 - idx)


                    # DB에 저장할 원본데이터
                    now_video = {
                        'video_id': video['snippet']['resourceId']['videoId'],
                        'title': video['snippet']['title'],
                        'published_at': video['snippet']['publishedAt'],
                        'video_keywords': title_keywords + script_keywords
                    }

                    video_list.append(now_video)

        print(keyword_score)
        print('------------------------------------------------')

        keywords = sorted(keyword_score.items(), key=lambda item: item[1], reverse=True)[:10]

        print(keywords)

        kw_list = []
        for k, v in keywords:
            kw_list.append(k)

        return " ".join(kw_list), video_list

    def get_search_ANIMAL_video(self, SEARCH_DATE):
        keyword_score, video_list = self.get_video_from_popular_videos(15)
        # keyword_score = {}
        # video_list = []

        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

        channel_num = ['animolva']
        channel_num_ID = {'animolva': 'UC22go5LdQEw-iDuxFb4C0hw', }

        for channel in channel_num:
            videos = self.get_videos_from_channel_by_num(youtube, channel_num_ID[channel], 12)

            cnt = 1
            for video in videos:
                print(f'[{cnt}/{len(videos)}] ', end='')
                cnt += 1

                title = video['snippet']['title']
                title = self.filter_unicode_characters(title)
                print(title)

                script = self.download_script_string(video['id']['videoId'])

                # 키워드 추출
                title_keywords = self.extract_keywords_textrank(title)[:3]

                script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                for idx in range(len(title_keywords)):
                    if title_keywords[idx] not in keyword_score:
                        keyword_score[title_keywords[idx]] = (3 - idx)
                    else:
                        keyword_score[title_keywords[idx]] += (3 - idx)

                for idx in range(len(script_keywords)):
                    if script_keywords[idx] not in keyword_score:
                        keyword_score[script_keywords[idx]] = (5 - idx)
                    else:
                        keyword_score[script_keywords[idx]] += (5 - idx)

                # DB에 저장할 원본데이터
                now_video = {
                    'video_id': video['id']['videoId'],
                    'title': video['snippet']['title'],
                    'published_at': video['snippet']['publishedAt'],
                    'video_keywords': title_keywords + script_keywords
                }

                video_list.append(now_video)

        channel_date = ['NationalGeographicKorea', 'KangBodeum']
        channel_date_ID = {'NationalGeographicKorea': 'UCPECLB_-7T4WukChKqhjv8g', 'KangBodeum': 'UCee1MvXr6E8qC_d2WEYTU5g',}

        for channel in channel_date:
            videos = self.get_videos_from_channel_by_date(youtube, channel_date_ID[channel], SEARCH_DATE, 14)

            cnt = 1
            for video in videos:
                if 'videoId' in video['id']:
                    print(video)
                    print(f'[{cnt}/{len(videos)}] ', end='')
                    cnt += 1

                    title = video['snippet']['title']
                    title = self.filter_unicode_characters(title)
                    print(title)

                    script = self.download_script_string(video['id']['videoId'])

                    # 키워드 추출
                    title_keywords = self.extract_keywords_textrank(title)[:3]

                    script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                    for idx in range(len(title_keywords)):
                        if title_keywords[idx] not in keyword_score:
                            keyword_score[title_keywords[idx]] = (3 - idx)
                        else:
                            keyword_score[title_keywords[idx]] += (3 - idx)

                    for idx in range(len(script_keywords)):
                        if script_keywords[idx] not in keyword_score:
                            keyword_score[script_keywords[idx]] = (5 - idx)
                        else:
                            keyword_score[script_keywords[idx]] += (5 - idx)

                    # DB에 저장할 원본데이터
                    now_video = {
                        'video_id': video['id']['videoId'],
                        'title': video['snippet']['title'],
                        'published_at': video['snippet']['publishedAt'],
                        'video_keywords': title_keywords + script_keywords
                    }

                    video_list.append(now_video)

        print(keyword_score)
        print('------------------------------------------------')

        keywords = sorted(keyword_score.items(), key=lambda item: item[1], reverse=True)[:10]

        print(keywords)

        kw_list = []
        for k, v in keywords:
            kw_list.append(k)

        return " ".join(kw_list), video_list

    def get_search_IT_video(self, SEARCH_DATE):
        keyword_score, video_list = self.get_video_from_popular_videos(28)
        # keyword_score = {}
        # video_list = []

        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

        channel_date = {
            'Techmong': {
                'url': 'UCFX6adXoyQKxft933NB3rmA',
                'period': 30,
            },
            'SEOULiAN': {
                'url': 'UClfR70cO8tFZHNCbBZsMw0Q',
                'period': 30,
            },
            'BULLSLAB': {
                'url': 'UCMYJw-gH6-_LNQzhqfYgDbg',
                'period': 30,
            },
            'SAMSUNGTECHNEWS': {
                'url': 'UC2C-970d2o-YGLPqsG6FcWQ',
                'period': 30,
            },
            'ITSUB': {
                'url': 'UCdUcjkyZtf-1WJyPPiETF1g',
                'period': 21,
            },
        }

        for key, value in channel_date.items():
            videos = self.get_videos_from_channel_by_date(youtube, value['url'], SEARCH_DATE, value['period'])

            cnt = 1
            for video in videos:
                if 'videoId' in video['id']:
                    print(video)
                    print(f'[{cnt}/{len(videos)}] ', end='')
                    cnt += 1

                    title = video['snippet']['title']
                    title = self.filter_unicode_characters(title)
                    print(title)

                    script = self.download_script_string(video['id']['videoId'])

                    # 키워드 추출
                    title_keywords = self.extract_keywords_textrank(title)[:3]

                    script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                    for idx in range(len(title_keywords)):
                        if title_keywords[idx] not in keyword_score:
                            keyword_score[title_keywords[idx]] = (3 - idx)
                        else:
                            keyword_score[title_keywords[idx]] += (3 - idx)

                    for idx in range(len(script_keywords)):
                        if script_keywords[idx] not in keyword_score:
                            keyword_score[script_keywords[idx]] = (5 - idx)
                        else:
                            keyword_score[script_keywords[idx]] += (5 - idx)

                    # DB에 저장할 원본데이터
                    now_video = {
                        'video_id': video['id']['videoId'],
                        'title': video['snippet']['title'],
                        'published_at': video['snippet']['publishedAt'],
                        'video_keywords': title_keywords + script_keywords
                    }

                    video_list.append(now_video)

        print(keyword_score)
        print('------------------------------------------------')

        keywords = sorted(keyword_score.items(), key=lambda item: item[1], reverse=True)[:10]

        print(keywords)

        kw_list = []
        for k, v in keywords:
            kw_list.append(k)

        return " ".join(kw_list), video_list

    def get_search_ENTERTAINMENT_video(self, SEARCH_DATE):
        keyword_score, video_list = self.get_video_from_popular_videos(24)
        # keyword_score = {}
        # video_list = []

        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

        channel_date = {
            'MBC': {
                'url': 'UCiBr0bK06imaMbLc8sAEz0A',
                'period': 1,
            },
            'SBS': {
                'url': 'UCmjNKt6kITwaZTqvWuaSPLg',
                'period': 1,
            },
            'KBS': {
                'url': 'UCK1sVuXaDvJeNwl9noN5nOA',
                'period': 1,
            },
            'tvn': {
                'url': 'UC78PMQprrZTbU0IlMDsYZPw',
                'period': 1,
            },
            'JTBC': {
                'url': 'UCFL1sCAksD6_7JIZwwHcwjQ',
                'period': 1,
            },
        }

        for key, value in channel_date.items():
            videos = self.get_videos_from_channel_by_date(youtube, value['url'], SEARCH_DATE, value['period'])

            cnt = 1
            for video in videos:
                if 'videoId' in video['id']:
                    print(video)
                    print(f'[{cnt}/{len(videos)}] ', end='')
                    cnt += 1

                    title = video['snippet']['title']
                    title = self.filter_unicode_characters(title)
                    print(title)

                    script = self.download_script_string(video['id']['videoId'])

                    # 키워드 추출
                    title_keywords = self.extract_keywords_textrank(title)[:3]

                    script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                    for idx in range(len(title_keywords)):
                        if title_keywords[idx] not in keyword_score:
                            keyword_score[title_keywords[idx]] = (3 - idx)
                        else:
                            keyword_score[title_keywords[idx]] += (3 - idx)

                    for idx in range(len(script_keywords)):
                        if script_keywords[idx] not in keyword_score:
                            keyword_score[script_keywords[idx]] = (5 - idx)
                        else:
                            keyword_score[script_keywords[idx]] += (5 - idx)

                    # DB에 저장할 원본데이터
                    now_video = {
                        'video_id': video['id']['videoId'],
                        'title': video['snippet']['title'],
                        'published_at': video['snippet']['publishedAt'],
                        'video_keywords': title_keywords + script_keywords
                    }

                    video_list.append(now_video)

        print(keyword_score)
        print('------------------------------------------------')

        keywords = sorted(keyword_score.items(), key=lambda item: item[1], reverse=True)[:10]

        print(keywords)

        kw_list = []
        for k, v in keywords:
            kw_list.append(k)

        return " ".join(kw_list), video_list

    def get_search_NEWMEDIA_video(self, SEARCH_DATE):
        keyword_score = {}
        video_list = []

        youtube = build("youtube", "v3", developerKey=self.api_key[self.api_key_idx])

        channel_date = {
            'VideoMug': {
                'url': 'UCMEbRpvuwTbXxGiyDb1mT8w',
                'period': 7,
            },
            'wng': {
                'url': 'UCb-AbqZutk9nTlJLZRcBinw',
                'period': 14,
            },
            'KLAB': {
                'url': 'UCoxT1kQSLq564FwpK473w-g',
                'period': 7,
            },
            'SUBUSU': {
                'url': 'UCQabORQKQRHP-iUqe-xIFvg',
                'period': 7,
            },
            '14F': {
                'url': 'UCLKuglhGlMmDteQKoniENIQ',
                'period': 7,
            },
            'SOTAM': {
                'url': 'UChuNP1cNlhUkUOQzBbH-C_Q',
                'period': 14,
            },
        }

        for key, value in channel_date.items():
            videos = self.get_videos_from_channel_by_date(youtube, value['url'], SEARCH_DATE, value['period'])

            cnt = 1
            for video in videos:
                if 'videoId' in video['id']:
                    print(video)
                    print(f'[{cnt}/{len(videos)}] ', end='')
                    cnt += 1

                    title = video['snippet']['title']
                    title = self.filter_unicode_characters(title)
                    print(title)

                    script = self.download_script_string(video['id']['videoId'])

                    # 키워드 추출
                    title_keywords = self.extract_keywords_textrank(title)[:3]

                    script_keywords = self.extract_keywords_textrank(script, extra_stopword = ['음악'])[:5]

                    for idx in range(len(title_keywords)):
                        if title_keywords[idx] not in keyword_score:
                            keyword_score[title_keywords[idx]] = (3 - idx)
                        else:
                            keyword_score[title_keywords[idx]] += (3 - idx)

                    for idx in range(len(script_keywords)):
                        if script_keywords[idx] not in keyword_score:
                            keyword_score[script_keywords[idx]] = (5 - idx)
                        else:
                            keyword_score[script_keywords[idx]] += (5 - idx)

                    # DB에 저장할 원본데이터
                    now_video = {
                        'video_id': video['id']['videoId'],
                        'title': video['snippet']['title'],
                        'published_at': video['snippet']['publishedAt'],
                        'video_keywords': title_keywords + script_keywords
                    }

                    video_list.append(now_video)

        print(keyword_score)
        print('------------------------------------------------')

        keywords = sorted(keyword_score.items(), key=lambda item: item[1], reverse=True)[:10]

        print(keywords)

        kw_list = []
        for k, v in keywords:
            kw_list.append(k)

        return " ".join(kw_list), video_list