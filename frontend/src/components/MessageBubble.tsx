interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ documentId: string; chunkIndex: number }>;
}

export default function MessageBubble({ role, content, citations }: MessageBubbleProps) {
  return (
    <div className={`p-3 rounded-lg ${role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
      <div>{content}</div>
      {citations && citations.length > 0 && (
        <div className="mt-2 flex gap-2">
          {citations.map((c, i) => (
            <span key={i} className="text-xs bg-blue-200 px-2 py-1 rounded">
              Source {i + 1}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
