const API_URL =
  "https://dev-multivac.runspeargrowth.com/api/text-analysis/grammarly";

export async function analyzeText(text) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return null;
  } catch (error) {
    console.log("API error:", error);
    return null;
  }
}
