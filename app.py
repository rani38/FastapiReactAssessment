from fastapi import FastAPI,Query
from pydantic import BaseModel
from database import Session,engine,Base
from model import PackageModel
app = FastAPI()

# Create the table
Base.metadata.create_all(bind=engine)

# Schema
class PackageSerializer(BaseModel):
    returnAddress : str
    destinationAddress :str
    packageId : int

    class Config:
        orm_mode = True
        schema_extra = {
            'example':{
                "returnAddress" : "India",
                "destinationAddress" : "USA",
                "packageId" : 988778
            }
        }#provide a schema for front-end developer


@app.get('/',response_model=None)
async def index():
    return "Hello World!"

@app.post('/package', response_model=None)
async def package_detail(package: PackageSerializer):
    existing_package = Session.query(PackageModel).filter_by(id=package.packageId).first()

    if existing_package:
        Session.close()
        return f"Package with ID {package.packageId} already exists in the database."

    new_package = PackageModel(id=package.packageId, returnAddress=package.returnAddress, destinationAddress=package.destinationAddress)
    Session.add(new_package)
    Session.commit()
    Session.close()
    return f"{package.dict()}"

@app.get("/data")
async def get_data(
        id: int = Query(None, description="Filter by ID"),
        return_address: str = Query(None, description="Filter by Return Address"),
        destination_address: str = Query(None, description="Filter by Destination Address"),
):

    query = Session.query(PackageModel)

    if id is not None:
        query = query.filter(PackageModel.id == id)

    if return_address is not None:
        query = query.filter(PackageModel.returnAddress == return_address)

    if destination_address is not None:
        query = query.filter(PackageModel.destinationAddress == destination_address)

    data = query.all()

    if data:
        return data
    return "No data found"