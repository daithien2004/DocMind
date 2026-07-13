const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/documents`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function getDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
}

export async function sendChat(question: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) throw new Error('Chat failed');
  return res.json();
}

export async function runEval() {
  const res = await fetch(`${API_BASE}/eval/run`, { method: 'POST' });
  if (!res.ok) throw new Error('Eval run failed');
  return res.json();
}

export async function getEvalResults() {
  const res = await fetch(`${API_BASE}/eval/results`);
  if (!res.ok) throw new Error('Failed to fetch eval results');
  return res.json();
}
