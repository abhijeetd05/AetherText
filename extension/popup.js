document.getElementById("checkBtn").addEventListener("click", async () => {
  const resultBox = document.getElementById("result");
  const text = document.getElementById("inputText").value.trim();

  if (!text) {
    resultBox.className = "result-error";
    resultBox.innerText = "Please enter text.";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error("Backend error");

    const data = await response.json();
    const label = data.final_label;
    const score = data.final_score;

    resultBox.className = "";

    if (label === "not_offensive") {
      resultBox.classList.add("result-safe");
      resultBox.innerHTML = `Prediction: ${label} (score: ${score.toFixed(2)})`;
    } else if (label === "offensive") {
      resultBox.classList.add("result-warning");
      resultBox.innerHTML = `Prediction: ${label} (score: ${score.toFixed(2)})`;
    } else if (label === "targeted_offensive") {
      resultBox.classList.add("result-danger");
      resultBox.innerHTML = `Prediction: ${label} (score: ${score.toFixed(2)})`;
    }
  } catch (err) {
    console.error(err);
    resultBox.className = "result-error";
    resultBox.innerText = "Error connecting to backend.";
  }
});
