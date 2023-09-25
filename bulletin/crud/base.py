#route는 string에 해당하는 데이터타입만 리턴 가능
from sql_app.schemas.bulletinboard import InquiryCreate
from sql_app.schemas.bulletinboard import InquiryUpdate
from sql_app.schemas.models import Inquiry
from sqlalchemy.orm import Session
from datetime import datetime


## 문의글 작성
def post_inquiry(db: Session, inquiry_create: InquiryCreate):
    db_inquiry = Inquiry(
        content=inquiry_create.content,
        password=inquiry_create.password,
        create_time=datetime.now()
    )

    db.add(db_inquiry)
    db.commit()

    return db_inquiry.id


## 문의글 조회 
def get_inquiry(db: Session, inquiry_id: int):
    inquiry = db.query(Inquiry).filter(Inquiry.id==inquiry_id).first()
    

## 문의글 수정
def put_inquiry(db: Session, db_inquiry: Inquiry, inquiry_update: InquiryUpdate):
    inquiry = db.query(Inquiry).filter(Inquiry.id == db_inquiry.id).first()
