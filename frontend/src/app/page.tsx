import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-gray-900">DocMind</h1>
        <p className="text-lg text-gray-600 text-center max-w-md">
          AI-powered document Q&A assistant. Upload documents and ask questions.
        </p>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start Chatting
          </Link>
          <Link
            href="/eval"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            View Eval Results
          </Link>
        </div>
      </main>
    </div>
  );
}
