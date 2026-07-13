export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b">
        <h1 className="text-xl font-semibold">DocMind Chat</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto">
          {/* ChatWindow component will go here */}
          <div className="text-center text-gray-500 mt-20">
            Chat interface — coming in Phase 5
          </div>
        </div>
      </main>
    </div>
  );
}
