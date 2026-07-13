'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    // TODO: Upload to backend POST /documents
    console.log('Upload:', file.name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold">Upload Document</h2>
      <input
        type="file"
        accept=".txt,.md,.pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border rounded p-2"
      />
      <button
        type="submit"
        disabled={!file}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
      >
        Upload
      </button>
    </form>
  );
}
