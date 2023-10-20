from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:jh991218**@localhost:3306/inquiry"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread" : False}
)
SessionLocal = sessionmaker(autoflush=False, bind=engine)

Base = declarative_base()
