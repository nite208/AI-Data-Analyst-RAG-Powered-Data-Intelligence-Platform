const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function uploadDataset(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/upload-dataset`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || 'Upload failed');
  }
  return res.json();
}

export async function getDatasets() {
  const res = await fetch(`${API_URL}/datasets`);
  if (!res.ok) {
    throw new Error('Failed to fetch datasets');
  }
  return res.json();
}

export async function queryDataset(query) {
  const res = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error('Query failed');
  return res.json();
}
