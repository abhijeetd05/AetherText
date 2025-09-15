document.addEventListener("mouseup", async () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    });

    if (!response.ok) throw new Error("Backend error");

    const data = await response.json();
    const label = data.final_label;
    const score = data.final_score;

    let bgColor = "gray";
    if (label === "not_offensive") bgColor = "green";
    if (label === "offensive") bgColor = "orange";
    if (label === "targeted_offensive") bgColor = "red";

    const oldTooltip = document.getElementById("safetext-tooltip");
    if (oldTooltip) oldTooltip.remove();

    const tooltip = document.createElement("div");
    tooltip.id = "safetext-tooltip";
    tooltip.innerText = `${label} (${score.toFixed(2)})`;
    tooltip.style.position = "absolute";
    tooltip.style.background = bgColor;
    tooltip.style.color = "white";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "12px";
    tooltip.style.fontWeight = "bold";
    tooltip.style.zIndex = "9999";

    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
      tooltip.style.left = `${rect.left + window.scrollX}px`;
    }

    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.remove(), 3000);

  } catch (err) {
    console.error("Error fetching prediction:", err);
  }
});
