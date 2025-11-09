import { useState } from "react";
import { Button } from "@/components/ui/button";
import { benchmarkAllModels, type ModelScore } from "@/services/modelBenchmark";
import { Progress } from "@/components/ui/progress";

const RunBenchmark = () => {
  const [results, setResults] = useState<ModelScore[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const runTest = async () => {
    setRunning(true);
    setLog([]);
    setProgress(0);

    try {
      const benchmarkResults = await benchmarkAllModels((msg) => {
        setLog((prev) => [...prev, msg]);
        setProgress((p) => Math.min(p + 1, 100));
      });

      setResults(benchmarkResults);
      setProgress(100);
      
      // Auto-download results
      const json = JSON.stringify({
        title: "Vishnu AI Real Benchmark Results",
        generatedAt: new Date().toISOString(),
        results: benchmarkResults,
        topPerformer: benchmarkResults[0]
      }, null, 2);
      
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `real-benchmark-${Date.now()}.json`;
      a.click();
      
      setLog((prev) => [...prev, '✅ Results downloaded!']);
    } catch (error) {
      setLog((prev) => [...prev, `❌ Error: ${error}`]);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Run Real Benchmark Test</h1>
        
        <Button
          onClick={runTest}
          disabled={running}
          className="mb-8"
          size="lg"
        >
          {running ? 'Running Tests...' : 'Start Real Benchmark'}
        </Button>

        {running && <Progress value={progress} className="mb-4" />}

        <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 h-96 overflow-y-auto">
          {log.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Results Summary</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Rank</th>
                  <th className="text-left p-2">Model</th>
                  <th className="text-right p-2">Score</th>
                  <th className="text-right p-2">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.modelName} className="border-b">
                    <td className="p-2">#{i + 1}</td>
                    <td className="p-2 font-semibold">{r.modelName}</td>
                    <td className="p-2 text-right">{r.overallScore.toFixed(2)}</td>
                    <td className="p-2 text-right">{r.accuracy.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunBenchmark;
