import chromadb
import pandas as pd
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify

app = Flask(__name__)

chroma_client = chromadb.PersistentClient(path="vectorstore")

collection_name = "recommendation_items"
collection = chroma_client.get_or_create_collection(name=collection_name)

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

df = pd.read_csv("Products_texts.csv")  
items = df.to_dict(orient="records")
ids = df["id"].astype(str).tolist()
texts = df["text"].tolist()


if collection.count() == 0:
    print("🧠 Adding items to vector store...")
    embeddings = model.encode(texts, normalize_embeddings=True).tolist()
    collection.add(
        ids=ids,
        documents=texts,
        metadatas=items,
        embeddings=embeddings
    )
    print("✅ Vector store initialized and persisted.")
else:
    print("✅ Vector store already loaded from disk.")

# ==================== API Routes ====================

@app.route("/add-item", methods=["POST"])
def add_item():
    data = request.json
    item_id = str(data.get("id"))
    title = data.get("title")
    description = data.get("description")

    if not item_id or not title or not description:
        return jsonify({"error": "id, title, and description are required"}), 400

    text = f"{title}. {description}"
    embedding = model.encode([text], normalize_embeddings=True).tolist()

    collection.add(
        ids=[item_id],
        documents=[text],
        metadatas=[data],
        embeddings=embedding
    )
    return jsonify({"message": "Item added successfully"})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "Query text is required"}), 400

    query_embedding = model.encode([query], normalize_embeddings=True).tolist()
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=4
    )

    recommendations = []
    for doc, meta, score in zip(results["documents"][0], results["metadatas"][0], results["distances"][0]):
        recommendations.append({
            "id": meta["id"],
            "text": doc,
            "score": round(float(score), 3)
        })

    return jsonify({"query": query, "recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True)
