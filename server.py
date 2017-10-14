import requests
import os
import json

ENDPOINT = "https://api.github.com/graphql"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
AUTH_STRING = "bearer {}".format(GITHUB_TOKEN)

def fetch_watched_commits(user):
    headers = {"Authorization": AUTH_STRING}
    query = {"query": "{ viewer  { login } }"}
    response = requests.post(ENDPOINT, headers=headers, data=json.dumps(query))
    print(response.content)

if __name__ == "__main__":
    fetch_watched_commits("JackHartley")