from sqlalchemy import Column, DateTime, VARCHAR, Integer
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Inquiry(Base):
    __tablename__ = "bulletinboard"

    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(VARCHAR(100), nullable=False)
    password = Column(VARCHAR(10), nullable=False)
    create_time = Column(DateTime, server_default=func.now(), onupdate=func.now())
    update_time = Column(DateTime, server_default=func.now(), onupdate=func.now())


#sqlalchemy는 모델 기반으로 데이터를 처리하기 때문에 모델 클래스를 정의하는 파일 필요
