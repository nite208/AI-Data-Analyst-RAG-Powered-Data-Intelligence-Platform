import os
import time
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_service import process_and_index_csv, search_faiss

app = FastAPI(title="DataSage AI API")

class QueryRequest(BaseModel):
    query: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
        
    try:
        process_and_index_csv(file_path)
    except Exception as e:
        print(f"RAG Error: {e}")
        
    return {"filename": file.filename, "uploaded_at": time.time()}

@app.get("/datasets")
def list_datasets():
    datasets = []
    if os.path.exists(UPLOAD_DIR):
        for filename in os.listdir(UPLOAD_DIR):
            if filename.endswith(".csv"):
                file_path = os.path.join(UPLOAD_DIR, filename)
                datasets.append({
                    "filename": filename,
                    "uploaded_at": os.path.getctime(file_path)
                })
    datasets.sort(key=lambda x: x["uploaded_at"], reverse=True)
    return datasets

@app.post("/query")
def query_rag(request: QueryRequest):
    results = search_faiss(request.query)
    return {"results": results}
