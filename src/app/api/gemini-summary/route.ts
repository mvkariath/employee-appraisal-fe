import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { appraisalData } = await req.json();

  const prompt = `
You are an HR assistant. Summarize the following employee appraisal data in a concise, conversational way. Highlight key achievements, strengths, areas for improvement, and development plans. Avoid copying text verbatim.

Appraisal Data:
${JSON.stringify(appraisalData, null, 2)}
`;

  const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCTaa04YX2Mo7iEPLad9-4NJKqAdg6Wqsg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const geminiData = await geminiRes.json();
  console.log("Gemini API response:", geminiData); // Debugging line to check the response structure
  const summary = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

  return NextResponse.json({ summary });
}


