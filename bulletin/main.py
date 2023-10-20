from datetime import datetime
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sql_app.schemas.models import Inquiry
from sql_app.schemas.bulletinboard import InquiryCreate, InquiryUpdate


DB_URL = 'mysql+pymysql://root:jh991218**@localhost:3306/inquiry' 
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI( 
    title='bulletin board', description='inquiries', openapi_url='/api/openapi.json'
    )
app.mount("/static", StaticFiles(directory="static"),name="static") 
templates = Jinja2Templates(directory="templates")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["view"], response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("main.html", {"request": request})


@app.post("/newinquiry/")
def create_inquiry(inquiry_create: InquiryCreate, db: SessionLocal = Depends(get_db)):

    db_inquiry = Inquiry(content = inquiry_create.content,
                         password = inquiry_create.password,
                         create_time = datetime.now()
                        )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)

    if db_inquiry is None:
        raise HTTPException(status_code=500, detail="문의글 작성 실패")
    else:
        return {"inquiry_id": db_inquiry.id}


# 조회
@app.get("/inquiry/")
def get_inquiry(inquiry_id: int, password: str, db: SessionLocal = Depends(get_db)):
    
    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    inquiry_password = db_inquiry.password

    if db_inquiry is None:
        raise HTTPException(status_code=404, detail="문의글을 찾을 수 없음")
    
    if password != inquiry_password:
        raise HTTPException(status_code=401, detail="패스워드 오류")
    else:
        return {"content": db_inquiry.content}
    

@app.put("/inquiry/{inquiry_id}")
def mod_inquiry(
    inquiry_id: int, inquiry_update: InquiryUpdate, db: SessionLocal = Depends(get_db)):

    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    
    db_inquiry.content = inquiry_update.content
    db_inquiry.update_time = datetime.now()
    db.commit()
    
    return


# 전체 문의글 목록
@app.get("/allinquiries/")
def show_inquiry(db: SessionLocal = Depends(get_db)):
    
    db_inquiry = db.query(Inquiry).all()

    return db_inquiry


@app.delete("/inquiry/{inquiry_id}")
def del_inquiry(inquiry_id: int, db: SessionLocal = Depends(get_db)):
    
    db.query(Inquiry).filter(Inquiry.id == inquiry_id).delete()
    db.commit()     
    
    return inquiry_id
