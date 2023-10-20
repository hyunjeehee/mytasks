from pydantic import BaseModel, validator

class InquiryCreate(BaseModel):
    content: str
    password: str
    
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

    class Config:
        orm_mode = True

