from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker

# database
db_url = "postgresql://postgres:1234@localhost/assessment"
engine = create_engine(db_url,echo=True)
Base = declarative_base()
session = sessionmaker(bind=engine)
Session = session()