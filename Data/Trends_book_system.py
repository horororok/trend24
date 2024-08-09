from qdrant_searching import QdrantSearcher
from cuda_model import CudaModel
from youtube.youtube_collector import YouTubeColletor
from mysql_insert import Mysql_Manager

import pandas as pd
from itertools import combinations
import time
from tqdm import tqdm


pd.set_option('display.max_columns', 10)
pd.set_option('display.max_rows', 10)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)

num_books_to_collect = 30
num_main_keywords = 4
# fixed_datetime = '2024-05-14 02:00:00'
namnams = ['2024-05-16 02:00:00']#'2024-05-13 02:00:00', '2024-05-12 02:00:00', '2024-05-11 02:00:00', '2024-05-10 02:00:00','2024-05-09 02:00:00'

def make_clu_sentence(sent, k=4):
    words = sent.split()

    # 문장에 있는 단어 수가 k 이하라면 원래 문장 반환
    if len(words) <= k:
        return sent

    clu_list = [' '.join(combo) for combo in combinations(words, k)]

    return clu_list


if __name__ == "__main__":
    process_start_time = time.time()

    now_time = time.time()
    cuda_model = CudaModel('CPU')
    print(f"사용할 디바이스: {cuda_model.device}")
    print(f'CUDA 로딩 시간: {time.time() - now_time}')

    now_time = time.time()
    Qsearcher = QdrantSearcher()
    print(f'Qdrant 로딩 시간: {time.time() - now_time}')

    now_time = time.time()
    youtubeCollector = YouTubeColletor()
    print(f'YouTubeColletor 로딩 시간: {time.time() - now_time}')

    now_time = time.time()
    sql_manager = Mysql_Manager()
    print(f'Mysql_Manager 로딩 시간: {time.time() - now_time}')

    youtube_category_map = {25: "NEWS", 28: "IT", 15: "ANIMAL", 10:"MUSIC", 24:"ENTERTAINMENT", 0:"NEWMEDIA"}
    keywords_id_map = {}

    auto_category = [28, 24, 25, 15, 0]#28, 24, 25, 15, 0

    for fixed_datetime in namnams:
        # while True:
        for auto_c in auto_category:
            must_not_category = []
            # search_mode = int(input('Enter mode(0: find only input sentence, 1: flexible search, 2: Youtube Popular Video): '))
            search_mode = 2

            if search_mode == 2:
                # video_category = int(input('1 : Film & Animation | 10 : Music | 15 : Pets & Animals\n'
                #                            '17 : Sports | 18 : Short Movies | 19 : Travel & Events\n'
                #                            '20 : Gaming | 24 : Entertainment | 25 : News & Politics\n'
                #                            '27 : Education | 28 : Science & Technology | 30 : Movies\n'
                #                            '36 : Drama\n'
                #                            'Enter youtube categoty:'))
                video_category = auto_c
                print(f'Start :: {youtube_category_map[auto_c]}')


                # must_not_category = input('Enter to must not category').split()
                # print(f'제외 시킬 카테고리 : {must_not_category}')

                # search_sentence, video_list = youtubeCollector.get_search_keyword_by_popular_videos(video_category)
                if video_category == 28:#IT
                    search_sentence, video_list = youtubeCollector.get_search_IT_video(fixed_datetime[:10])
                elif video_category == 24:#ENTERTAINMENT
                    search_sentence, video_list = youtubeCollector.get_search_ENTERTAINMENT_video(fixed_datetime[:10])
                elif video_category == 25:#NEWS
                    search_sentence, video_list = youtubeCollector.get_search_NEWS_video(fixed_datetime[:10])
                elif video_category == 15:#ANIMAL
                    search_sentence, video_list = youtubeCollector.get_search_ANIMAL_video(fixed_datetime[:10])
                elif video_category == 0:#NEWMEDIA
                    search_sentence, video_list = youtubeCollector.get_search_NEWMEDIA_video(fixed_datetime[:10])
                else:
                    search_sentence, video_list = "", []

                #sql 처리 파트
                keywords_id_map = {}
                #키워드 먼저 넣기
                keywords = search_sentence.split()

                keyword_rank_cnt = 0
                for kw in keywords:
                    keyword_id = sql_manager.insert_keyword(kw, 1 if keyword_rank_cnt < num_main_keywords else 0, youtube_category_map[video_category], fixed_datetime)
                    keywords_id_map[kw] = keyword_id
                    keyword_rank_cnt+=1

                #원본 영상 넣기
                for video in video_list:
                    video_id = sql_manager.insert_origin_data(video, "YOUTUBE", youtube_category_map[video_category], fixed_datetime)

                    #원본 데이터 - 키워드 Join 테이블 채우기
                    for pkw in video['video_keywords']:
                        if pkw in keywords_id_map:
                            sql_manager.insert_trend_source(keywords_id_map[pkw], video_id, fixed_datetime)
                #############
            else:
                search_sentence = input('Enter sentence(exit : ''): ')

            now_time = time.time()
            results = []

            if search_sentence is not '':
                print(f'Start Searching {search_sentence}')
                if search_mode == 0:
                    search_vector = cuda_model.model.encode(search_sentence)

                    results = Qsearcher.search_items(search_vector, search_sentence)
                elif search_mode == 1 or search_mode == 2:
                    search_part_sentences = make_clu_sentence(search_sentence)

                    tmp_results = []
                    for search_part_sentence in tqdm(search_part_sentences, desc="Processing"):
                        search_vector = cuda_model.model.encode(search_part_sentence)

                        tmp_results.extend(Qsearcher.search_items(search_vector, search_part_sentence.split()))

                        if len(tmp_results) > 200:
                            tmp_results = sorted(tmp_results, key=lambda x: x['score'], reverse=True)
                            tmp_results = tmp_results[:num_books_to_collect]

                    tmp_results = sorted(tmp_results, key = lambda x: x['score'], reverse=True)

                    existing_books = set([])
                    tmp_idx = 0

                    while len(results) < num_books_to_collect and tmp_idx < len(tmp_results):
                        if tmp_results[tmp_idx]['book_name'] not in existing_books:
                            existing_books.add(tmp_results[tmp_idx]['book_name'])
                            results.append(tmp_results[tmp_idx])
                        else:
                            pass

                        tmp_idx += 1
            else:
                break

            print(f'[{search_sentence} :: {search_mode}] 검색 시간: {time.time() - now_time}')
            for result in results:
                print(result, end="\n----------------------------\n")
                # sql 처리 파트
                book_pk = sql_manager.insert_daily_recommend(result['book_id'], fixed_datetime)

                for kw in result['searched_keywords']:
                    sql_manager.insert_recommend_keyword(book_pk, keywords_id_map[kw], fixed_datetime)

        print(f'전체 걸린 시간 : {time.time() - process_start_time}')
