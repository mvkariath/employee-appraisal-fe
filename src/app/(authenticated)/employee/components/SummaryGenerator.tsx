import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GeminiAppraisalSummaryChat({ appraisalData }: { appraisalData: any }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary(null);
    const res = await fetch("/api/gemini-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appraisalData })
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="my-4">
      <Button onClick={handleSummarize} disabled={loading}>
        {loading ? "Analyzing..." : "Summarize with AI"}
      </Button>
      {summary && (
        <div className="mt-4 p-4 bg-gray-50 rounded border">
          <strong>AI Summary:</strong>
          <p className="mt-2 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}