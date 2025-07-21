const form = document.getElementById("secureForm");
const input = document.getElementById("textInput");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");
const modeToggle = document.getElementById("modeToggle");
const submitButton = document.getElementById("submitButton");
const modeLabel = document.getElementById("modeLabel");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value;
  const mode = modeToggle.checked ? "decrypt" : "encrypt";
  const url = `http://localhost:8000/${mode}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    resultText.textContent = data.result;
    resultBox.style.display = "block";
  } catch (error) {
    resultText.textContent = "❌ Server not reachable!";
    resultBox.style.display = "block";
  }
});

modeToggle.addEventListener("change", () => {
  const mode = modeToggle.checked ? "Decrypt" : "Encrypt";
  submitButton.textContent = mode;
  modeLabel.textContent = mode;
});

function copyToClipboard() {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => {
      alert("Copied to clipboard!");
    });
}
