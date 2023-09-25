from datetime import datetime
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sql_app.schemas.models import Inquiry
from sql_app.schemas.bulletinboard import InquiryCreate, InquiryUpdate
from crud.base import post_inquiry, put_inquiry

# SQLAlchemy 연결 설정
DB_URL = 'mysql+pymysql://root:jh991218**@localhost:3306/inquiry'   #db 경로 설정
engine = create_engine(DB_URL)
# SessionLocal = Session(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()         #인스턴스 생성

# Dependency: 데이터베이스 세션 가져오기
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


## 문의글 작성 - 작성 성공시 문의글 id 리턴할 것
@app.post("/newinquiry/")
def create_inquiry(inquiry_create: InquiryCreate, db: SessionLocal = Depends(get_db)):

    db_inquiry = Inquiry(content = inquiry_create.content,
                         password = inquiry_create.password,
                         create_time = datetime.now()
                         )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)

    return {"inquiry_id": db_inquiry.id, "user": db_inquiry.content}


## 문의글 조회 - 문의글 작성 후 리턴받은 id로 조회할 것 
@app.get("/checkinquiry/{inquiry_id}")
def get_inquiry(inquiry_id: int, db: SessionLocal = Depends(get_db)):

    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()

    if db_inquiry is None:
        raise HTTPException(status_code=404, detail="패스워드 오류")
    
    return {"inquiry_id": db_inquiry.id, "content": db_inquiry.content}


## 문의글 수정 - 수정일자 변경
@app.put("/modinquiry/{inquiry_id}")
def mod_inquiry(
    inquiry_id: int, inquiry_update: InquiryUpdate, db: SessionLocal = Depends(get_db)):

    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()

    if db_inquiry.password != inquiry_update.password:
        raise HTTPException(status_code=401, detail="패스워드 오류")
    
    db_inquiry.content = inquiry_update.content
    db_inquiry.update_time = datetime.now()
    db.commit()

    return {"message": "문의글이 수정되었습니다.", "inquiry_id": db_inquiry.id}