# Uncomment the imports below before you add the function code
import requests
import os
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, timeout=10)
        return response.json()
    except Exception as err:
        # If any error occurs
        print(f"Network exception occurred in get_request: {err!r}")


def analyze_review_sentiments(text):
    # URL-encode the review text so characters like / ? # % don't break the URL
    request_url = sentiment_analyzer_url + "analyze/" + quote(text, safe="")
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, timeout=10)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict, timeout=10)
        print("insert_review status:", response.status_code)
        print("insert_review body:", response.text)

        # Treat HTTP errors (e.g. 500 from Express) as failures
        if not response.ok:
            return None
        return response.json()
    except Exception as err:
        print(f"Network exception occurred in post_review: {err!r}")