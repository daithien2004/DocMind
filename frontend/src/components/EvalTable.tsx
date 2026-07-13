interface EvalResult {
  id: string;
  evalCaseId: string;
  actualAnswer: string;
  score: number;
  latencyMs: number;
  passed: boolean;
}

interface EvalTableProps {
  results: EvalResult[];
}

export default function EvalTable({ results }: EvalTableProps) {
  if (results.length === 0) {
    return <div className="text-gray-500">No eval results yet. Run eval from /eval/run</div>;
  }

  return (
    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Score</th>
          <th className="p-3 text-left">Latency</th>
          <th className="p-3 text-left">Answer</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-3">
              <span className={r.passed ? 'text-green-600' : 'text-red-600'}>
                {r.passed ? 'PASS' : 'FAIL'}
              </span>
            </td>
            <td className="p-3">{r.score.toFixed(2)}</td>
            <td className="p-3">{r.latencyMs}ms</td>
            <td className="p-3 max-w-xs truncate">{r.actualAnswer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
