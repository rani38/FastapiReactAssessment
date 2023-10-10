from database import Session,engine,Base
from sqlalchemy import Column,Integer,String

class PackageModel(Base):
    __tablename__ = "PackageModel"

    id = Column(Integer,nullable=False,primary_key=True)
    returnAddress = Column(String,nullable=False)
    destinationAddress = Column(String,nullable=False)

    def __repr__(self):
        return f"<PackageModel {PackageModel.id}>"
