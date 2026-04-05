import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import warnings

warnings.filterwarnings('ignore')

model = SentenceTransformer('all-MiniLM-L6-v2')
dimension = 384
index = faiss.IndexFlatL2(dimension)
metadata_store = []

def process_and_index_csv(file_path: str):
    df = pd.read_csv(file_path)
    texts = []
    
    # Simple conversion of row content to a text line
    for _, row in df.iterrows():
        text = ", ".join([f"{str(col)}: {str(val)}" for col, val in row.items()])
        texts.append(text)
    
    if not texts:
        return
        
    # Generate embeddings and populate Faiss
    embeddings = model.encode(texts)
    embeddings = np.array(embeddings).astype('float32')
    
    global metadata_store
    index.add(embeddings)
    metadata_store.extend(texts)

def search_faiss(query: str, top_k: int = 3):
    if index.ntotal == 0:
        return []
        
    query_embedding = model.encode([query])
    query_embedding = np.array(query_embedding).astype('float32')
    
    distances, indices = index.search(query_embedding, top_k)
    
    results = []
    for i in indices[0]:
        if 0 <= i < len(metadata_store):
            results.append(metadata_store[i])
            
    return results
