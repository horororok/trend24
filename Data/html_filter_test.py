from bs4 import BeautifulSoup
import json
from tqdm import tqdm

def remove_html_tags(text):
    # BeautifulSoup 객체를 생성하여 HTML 태그를 파싱합니다.
    soup = BeautifulSoup(text, "html.parser")
    # .get_text() 메소드를 사용하여 모든 태그를 제거하고 순수 텍스트만 추출합니다.
    return soup.get_text()




if __name__ == '__main__':
    # JSON 파일 경로
    file_path = "C:/Users/SSAFY/jupyter/S10P31S203/book_yes24.json"

    with open(file_path, "r", encoding="utf-8") as json_file:
        cnt = 0
        for line in tqdm(json_file, desc="Processing"):
            if cnt > 3:
                break

            clean_text = remove_html_tags(json.loads(line)['contents'])

            print(clean_text)
