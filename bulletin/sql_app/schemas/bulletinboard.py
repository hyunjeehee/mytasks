from datetime import datetime
from pydantic import BaseModel, validator #pydantic을 이용하면 type annotation을 이용해 데이터를 검증하고 설정들 관리 가능

class InquiryCreate(BaseModel):
    content: str
    password: str
    create_time: datetime

    @validator('content')
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v
    
class InquiryCheck(BaseModel):
    id: int
    password: str

class InquiryUpdate(BaseModel):
    content: str
    password: str
    update_time: datetime

    class Config:
        orm_mode = True
        #orm객체를 읽거나, 변수로 할당하여 처리하거나, json반환을 위해 orm객체에 접근할 때 해줌
        #orm이란/ object relational mapping
