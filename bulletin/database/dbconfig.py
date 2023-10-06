#삽질코드
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sql_app.schemas.models import DATABASE_URL 

# DB_URL = 'mysql+pymysql://root:jh991218**@localhost:3306/inquiry'   # DB 경로 설정
# engine = create_engine(DB_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# from sqlalchemy.orm import declarative_base
# # from sqlalchemy import create_engine
# # from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

# # #engine생성

# Base = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:jh991218**@localhost:3306/inquiry"

#엔진을 만듦; 커넥션 풀 생성(DB에 접속하는 객체를 일정 개수만큼 만들어놓고 돌려가며 사용)
#   커넥션 풀은 DB에 접속하는 세션 수를 제어하고 세션 접속에 소요되는 시간을 줄이고자하는 용도로 사용
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread" : False}
)
SessionLocal = sessionmaker(autoflush=False, bind=engine)

#DB모델이나 클래스들을 상속해오며 상속 클래스들을 자동으로 인지하고 알아서 매핑해줌
Base = declarative_base()

