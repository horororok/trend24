import MySQLdb
from pytrends.request import TrendReq
from datetime import datetime

# Google Trends 객체 생성
pytrends = TrendReq(hl='ko-KR', tz=540)

# 현재 날짜 가져오기
current_date = datetime.now().strftime('%Y-%m-%d')

# 트렌드하는 검색어 가져오기
df = pytrends.trending_searches(pn='south_korea')

# 결과 출력
print("현재 날짜:", current_date)
print(df)