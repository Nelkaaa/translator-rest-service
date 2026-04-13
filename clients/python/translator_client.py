import requests
from requests.auth import HTTPBasicAuth

url = "http://localhost:8080/translator-rest-service/api/translator/translate"

payload = {
    "text": "Hello, how are you?",
    "targetLanguage": "Moroccan Arabic Darija"
}

response = requests.post(
    url,
    json=payload,
    auth=HTTPBasicAuth("noha", "noha123!")
)

print(response.json())