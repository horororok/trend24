interface resultType {
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  list: {
    drawerId: number;
    name: string;
    books: {
      bookId: number;
      productId: number;
      searchKeyword: string;
      totalClickCount: number;
      totalOrderCount: number;
      totalOrderAmount: number;
      contents: string;
      productName: string;
      salePrice: number;
      categoryName: string;
      totalPurchaseCount: number|null;
    }[];
  }[];
}

interface booksType {
  status: number;
  message: string;
  result?: resultType;
}

export const booksResponse: booksType = {
  status: 200,
  message: "성공",
  result: {
    pageInfo: {
      page: 1,
      size: 10,
      totalElements: 100,
      totalPages: 10,
    },
    list: [
      {
        drawerId: 1,
        name: "인공지능",
        books: [
          {
            bookId: 60699,
            productId: 496,
            productName: "깜둥이 소년",
            categoryName: "소설/시/희곡",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 8550,
            contents:
              "백인의 억압속에서도 인간다운 생활에의 열망과 자신의 꿈을 이루기 위해 남부를 떠나와 겪은 인생역정을 리얼하게 그려낸 흑인작가 리처드 라이트의 자전소설.작가는 자신이 살아온 이야기를 솔직하게 묘사함으로 더욱 진한 감동을 전달하며 30년대 미국 정치 문화와 당시 흑인들의 실태를 알 수 있다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60700,
            productId: 1238,
            productName: "싹싹싹",
            categoryName: "유아",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 10800,
            contents:
              "스스로 이유식을 먹고 싶어 하지만 숟가락질이 서툴어 자꾸만 흘리는 모습을 보여주고 있다. 모든 것을 자율적으로 해결하려는 능동성을 키워주는 책이다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60701,
            productId: 1342,
            productName: "그림으로 보는 시간의 역사",
            categoryName: "자연과학",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 20700,
            contents:
              "영국의 천체물리학자 스티븐 호킹이 우주와 물질, 시간과 공간의 역사에 대한 방대한 이야기를 간결한 형태로 담아 일반 대중들도 이해하기 쉽게 만든 우주과학서. 아인슈타인의 특수상대성 이론 및 일반상대성 이론과 양자론을 비롯해서 소립자 물리학, 불랙홀, 초끈 이론 등 현대 물리학의 줄기에 해당하는 중심적인 사상들을 일목요연하게 살펴볼 수 있다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60702,
            productId: 16386,
            productName: "검피 아저씨의 드라이브",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 11700,
            contents:
              "<검피 아저씨의 뱃놀이>와 짝이 되는 책. 꼬마들은 이번엔 동네 아저씨 자동차에 올라타 신나게 드라이브를 떠난다. 도중에 차가 고장나고 야단 법석이 벌어지지만, 모두들 안전하게 즐거운 내 집으로 귀향. 전권과 마찬가지로 반복적인 문장을 통해서 어린이들에게 말 예절을 가르친다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60703,
            productId: 20735,
            productName: "엘리트 보다는 사람이 되어라",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 6300,
            contents:
              "자녀교육을 어떻게 해야 하나． 어떻게 하면 똑똑하면서도 사람이 되게 기를 수 있을까―이 시대 부모들은 한결같이 이런 고민을 하고 있다．\r\n\r\n그래서 성공적인 자녀교육수기에 관심이 쏠리게 된다．`아이들은 반드시 모유로 키웠고， 집에서는 한국말만 쓰면서 어른들에 대한 존경심을 기르게 했다． 방과후 숙제를 끝내야만 놀 수 있다는 규칙을 지키게 하고 토요일마다 가족 모두가 도서관에 다녀와 읽은 책마다 독후감을 쓰게 하고 토론을 했다」６남매（아들 ４， 딸 ２）를 하버드대와 예일대를 졸업시킨 전혜성씨의 자녀교육지침이다．\r\n\r\n예일대 동암문화연구소의 이사장인 전씨는 법학자였던 남편 고광림씨와 함께 이런 지침을 지켜왔다． 장녀 경신（５０·하버드대졸·중앙대 화학과교수） 장남 경주（４４·예일대졸·보스턴대의대 교수） ２남 동주（４２·하버드대졸·매사추세츠대 의대교수） ３남 홍주（３９·하버드대졸·예일대법대 석좌교수） ２녀 경은（３７·하버드대졸·〃 ） ４남 정주（３６·하버드대졸·미술가）등６남매는 부부의 노력이 성공했음을 보여준다．\r\n\r\n홍주씨는 한국인 최초로 예일대법대 정교수가 됐고， 경은씨는 유색인종 최초로 예일대법대 석좌교수가 돼 오빠와 함께 현재 석좌교수로 일하고 있다． 전씨가족은 ２００년 예일대사상 처음으로 한 가족 ４명（부부，３남, ２녀）이 강단에 서는 기록을 세웠다． 전씨부부의 가정교육철학은 두 가지로 요약된다． 첫째는 재주가 덕을 앞서서는 안된다는 점， 둘째는 많은 사람들에게 도움을 줄 수 있는 사람이 돼야 한다는 점이다．\r\n\r\n부부는 열심히 공부하는 모습을 보여주어 자녀들 스스로 공부하게 했다． 전씨의 남편은 서울대 법대를 수석졸업한 뒤 유학， 한국 최초의 하버드대 법학박사학위와 러커스트대 정치학 박사학위를 받았다． 전씨도 보스턴대에서 사회학·인류학 박사학위를 받는등 한 가정에서 박사학위 １２개를 따내 미교육부에 의해 「연구대상 가족」으로 선정되 기도 했다．\r\n\r\n전씨는 ４０여년간의 삶을 회고하는 교육수상록 <엘리트보다는 사람이 되어라>를 펴냈다． 전씨는 이 책에서 이화여대영문과 ２년때인 ４８년 미국유학을 떠나 ５１년 결혼， 인종차별이 심한 미국사회에서 ４남 ２녀를 길러낸 이야기를 들려준다． \r\n\r\n아내로，생계를 꾸리는 고학생주부로， 연년생이다시피 한 ６남매의 어머니로， 수재들을 가르치는 교수로， 한국학을 전파하는 「비교문화대사」로 살았던 １인５역의 세월을 전씨는 실타래처럼 풀어내고 있다．전씨는 자녀교육에 대해 이렇게 말한다． `우리는 한 번도 공부 잘 하라고 말해 본 적이 없습니다． 재주가 덕을 앞서지 않는 사람노릇을 하도록 사명감을 강조했을 뿐입니다`",
            totalPurchaseCount: null,
          },
          {
            bookId: 60704,
            productId: 22346,
            productName: "성공하는 사람들의 7가지 습관",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 10710,
            contents:
              "나는 그 구절을 몇번이고 읽었다. 그 구절은 자극과 반응 사이에는 간격, 즉 공간이 있다는 것과, 또 우리의 성장과 행복의 열쇠는 우리가 이 공간을 어떻게 이용하느냐에 달려 있다는 아주 단순한 아이디어였다.\r\n\r\n이것은 마치 내가 이 간격의 틈 사이에 서서 밖에 있는 수많은 자극들을 내다보며, 아 아이디어를 어떻게 적용하고 있나를 관찰하는 것 겉었다. 나는 스스로 반응을 선택할 수 있다는 정신적인 해방감을 느끼게 되었다. 또 자신이 자극도 될 수 있고, 영향력을 행사할 수도 있으며, 심지어는 자극과 반응을 거꾸로 돌려놓을 수도 있다는 사실에 흥분되었다.",
            totalPurchaseCount: null,
          },
        ],
      },
      {
        drawerId: 2,
        name: "IT",
        books: [
          {
            bookId: 60699,
            productId: 496,
            productName: "깜둥이 소년",
            categoryName: "소설/시/희곡",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 8550,
            contents:
              "백인의 억압속에서도 인간다운 생활에의 열망과 자신의 꿈을 이루기 위해 남부를 떠나와 겪은 인생역정을 리얼하게 그려낸 흑인작가 리처드 라이트의 자전소설.작가는 자신이 살아온 이야기를 솔직하게 묘사함으로 더욱 진한 감동을 전달하며 30년대 미국 정치 문화와 당시 흑인들의 실태를 알 수 있다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60700,
            productId: 1238,
            productName: "싹싹싹",
            categoryName: "유아",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 10800,
            contents:
              "스스로 이유식을 먹고 싶어 하지만 숟가락질이 서툴어 자꾸만 흘리는 모습을 보여주고 있다. 모든 것을 자율적으로 해결하려는 능동성을 키워주는 책이다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60701,
            productId: 1342,
            productName: "그림으로 보는 시간의 역사",
            categoryName: "자연과학",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 20700,
            contents:
              "영국의 천체물리학자 스티븐 호킹이 우주와 물질, 시간과 공간의 역사에 대한 방대한 이야기를 간결한 형태로 담아 일반 대중들도 이해하기 쉽게 만든 우주과학서. 아인슈타인의 특수상대성 이론 및 일반상대성 이론과 양자론을 비롯해서 소립자 물리학, 불랙홀, 초끈 이론 등 현대 물리학의 줄기에 해당하는 중심적인 사상들을 일목요연하게 살펴볼 수 있다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60702,
            productId: 16386,
            productName: "검피 아저씨의 드라이브",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 11700,
            contents:
              "<검피 아저씨의 뱃놀이>와 짝이 되는 책. 꼬마들은 이번엔 동네 아저씨 자동차에 올라타 신나게 드라이브를 떠난다. 도중에 차가 고장나고 야단 법석이 벌어지지만, 모두들 안전하게 즐거운 내 집으로 귀향. 전권과 마찬가지로 반복적인 문장을 통해서 어린이들에게 말 예절을 가르친다.",
            totalPurchaseCount: null,
          },
          {
            bookId: 60703,
            productId: 20735,
            productName: "엘리트 보다는 사람이 되어라",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 6300,
            contents:
              "자녀교육을 어떻게 해야 하나． 어떻게 하면 똑똑하면서도 사람이 되게 기를 수 있을까―이 시대 부모들은 한결같이 이런 고민을 하고 있다．\r\n\r\n그래서 성공적인 자녀교육수기에 관심이 쏠리게 된다．`아이들은 반드시 모유로 키웠고， 집에서는 한국말만 쓰면서 어른들에 대한 존경심을 기르게 했다． 방과후 숙제를 끝내야만 놀 수 있다는 규칙을 지키게 하고 토요일마다 가족 모두가 도서관에 다녀와 읽은 책마다 독후감을 쓰게 하고 토론을 했다」６남매（아들 ４， 딸 ２）를 하버드대와 예일대를 졸업시킨 전혜성씨의 자녀교육지침이다．\r\n\r\n예일대 동암문화연구소의 이사장인 전씨는 법학자였던 남편 고광림씨와 함께 이런 지침을 지켜왔다． 장녀 경신（５０·하버드대졸·중앙대 화학과교수） 장남 경주（４４·예일대졸·보스턴대의대 교수） ２남 동주（４２·하버드대졸·매사추세츠대 의대교수） ３남 홍주（３９·하버드대졸·예일대법대 석좌교수） ２녀 경은（３７·하버드대졸·〃 ） ４남 정주（３６·하버드대졸·미술가）등６남매는 부부의 노력이 성공했음을 보여준다．\r\n\r\n홍주씨는 한국인 최초로 예일대법대 정교수가 됐고， 경은씨는 유색인종 최초로 예일대법대 석좌교수가 돼 오빠와 함께 현재 석좌교수로 일하고 있다． 전씨가족은 ２００년 예일대사상 처음으로 한 가족 ４명（부부，３남, ２녀）이 강단에 서는 기록을 세웠다． 전씨부부의 가정교육철학은 두 가지로 요약된다． 첫째는 재주가 덕을 앞서서는 안된다는 점， 둘째는 많은 사람들에게 도움을 줄 수 있는 사람이 돼야 한다는 점이다．\r\n\r\n부부는 열심히 공부하는 모습을 보여주어 자녀들 스스로 공부하게 했다． 전씨의 남편은 서울대 법대를 수석졸업한 뒤 유학， 한국 최초의 하버드대 법학박사학위와 러커스트대 정치학 박사학위를 받았다． 전씨도 보스턴대에서 사회학·인류학 박사학위를 받는등 한 가정에서 박사학위 １２개를 따내 미교육부에 의해 「연구대상 가족」으로 선정되 기도 했다．\r\n\r\n전씨는 ４０여년간의 삶을 회고하는 교육수상록 <엘리트보다는 사람이 되어라>를 펴냈다． 전씨는 이 책에서 이화여대영문과 ２년때인 ４８년 미국유학을 떠나 ５１년 결혼， 인종차별이 심한 미국사회에서 ４남 ２녀를 길러낸 이야기를 들려준다． \r\n\r\n아내로，생계를 꾸리는 고학생주부로， 연년생이다시피 한 ６남매의 어머니로， 수재들을 가르치는 교수로， 한국학을 전파하는 「비교문화대사」로 살았던 １인５역의 세월을 전씨는 실타래처럼 풀어내고 있다．전씨는 자녀교육에 대해 이렇게 말한다． `우리는 한 번도 공부 잘 하라고 말해 본 적이 없습니다． 재주가 덕을 앞서지 않는 사람노릇을 하도록 사명감을 강조했을 뿐입니다`",
            totalPurchaseCount: null,
          },
          {
            bookId: 60704,
            productId: 22346,
            productName: "성공하는 사람들의 7가지 습관",
            categoryName: "(미분류)",
            searchKeyword: "",
            totalClickCount: 1,
            totalOrderCount: 0,
            totalOrderAmount: 0,
            salePrice: 10710,
            contents:
              "나는 그 구절을 몇번이고 읽었다. 그 구절은 자극과 반응 사이에는 간격, 즉 공간이 있다는 것과, 또 우리의 성장과 행복의 열쇠는 우리가 이 공간을 어떻게 이용하느냐에 달려 있다는 아주 단순한 아이디어였다.\r\n\r\n이것은 마치 내가 이 간격의 틈 사이에 서서 밖에 있는 수많은 자극들을 내다보며, 아 아이디어를 어떻게 적용하고 있나를 관찰하는 것 겉었다. 나는 스스로 반응을 선택할 수 있다는 정신적인 해방감을 느끼게 되었다. 또 자신이 자극도 될 수 있고, 영향력을 행사할 수도 있으며, 심지어는 자극과 반응을 거꾸로 돌려놓을 수도 있다는 사실에 흥분되었다.",
            totalPurchaseCount: null,
          },
        ],
      },
    ],
  },
};

// export const booksResponse: booksType | failedBooksType =
// {
//   "status": 500,
//   "message": "서버 오류"
// };

export const emptyBooks = [];
