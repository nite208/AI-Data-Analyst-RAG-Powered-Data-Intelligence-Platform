import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import warnings
from advisor_service import generate_recommendations

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

def generate_insights(raw_records: list):
    if not raw_records:
        return {
            "summary": "I couldn't find any relevant data matching your query.",
            "insights": [],
            "raw_data": []
        }
    
    parsed_records = []
    num_keys = set()
    
    for row in raw_records:
        parts = row.split(", ")
        parsed = {}
        for p in parts:
            if ": " in p:
                k, v = p.split(": ", 1)
                try:
                    parsed[k] = float(v)
                    num_keys.add(k)
                except ValueError:
                    parsed[k] = v
        parsed_records.append(parsed)
    
    insights = []
    
    for nk in num_keys:
        vals = [r[nk] for r in parsed_records if nk in r]
        if vals:
            insights.append(f"Highest {nk}: {max(vals)}")
            insights.append(f"Lowest {nk}: {min(vals)}")
            avg = sum(vals) / len(vals)
            insights.append(f"Average {nk}: {avg:.2f}")

    # Deduplicate and limit
    insights = list(dict.fromkeys(insights))[:6]
    
    summary = f"I analyzed {len(raw_records)} relevant records based on your question. Here are the key patterns found."

    recommendations = generate_recommendations(parsed_records)

    return {
        "summary": summary,
        "insights": insights,
        "recommendations": recommendations,
        "raw_data": parsed_records
    }
