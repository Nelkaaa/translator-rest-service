chrome.storage.local.get("selectedText", (data) => {
  if (data.selectedText) {
    document.getElementById("inputText").value = data.selectedText;
  }
});

document.getElementById("translateBtn").addEventListener("click", () => {
  const text = document.getElementById("inputText").value;
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  if (!text.trim()) {
    status.textContent = "Please enter text to translate.";
    return;
  }

  status.textContent = "Translating...";
  result.textContent = "";

  const credentials = btoa("noha:noha123!");

  fetch("http://localhost:8080/translator-rest-service/api/translator/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + credentials
    },
    body: JSON.stringify({
      text: text,
      targetLanguage: "Moroccan Arabic Darija"
    })
  })
  .then(response => response.json())
  .then(data => {
    status.textContent = "Translation:";
    result.textContent = data.translation;
  })
  .catch(error => {
    status.textContent = "Error: " + error.message;
  });
});