from pydantic import BaseModel
from typing import Generic, TypeVar, Optional

# 제네릭 타입 변수 T를 정의합니다.
T = TypeVar('T')

class BookResponse(BaseModel):
    bookId: int
    productId: int
    productName: str
    categoryName: str
    searchKeyword: str
    totalClickCount: int
    totalOrderCount: int
    totalOrderAmount: int
    salePrice: int
    contents: str
    totalPurchaseCount: Optional[int] = 0