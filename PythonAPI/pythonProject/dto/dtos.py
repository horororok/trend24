from pydantic import BaseModel
from typing import Generic, TypeVar
from typing import Any

# 제네릭 타입 변수 T를 정의합니다.
T = TypeVar('T')

class ApiResponse(BaseModel, Generic[T]):
    status: int
    message: str
    result: Any
    # result: T

