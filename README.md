# Oasys Health Chatbot

Welcome to the Oasys Health Chatbot project! This chatbot is designed to act as a supportive mental health assistant, providing helpful and supportive responses to user queries.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)

## Introduction

The Oasys Health Chatbot is a web-based application that leverages the OpenAI GPT-4 model to provide mental health support. The chatbot interacts with users in a friendly and supportive manner, aiming to assist with mental health queries.

## Features

- User-friendly interface
- Real-time chat functionality
- Secure API key management
- Responsive design

Notes for me:

- run 'node server.js' in terminal to run on live-server

- frontend can't access the backend if on the internet which is why github version won't work. need to deploy backend server to a publicly accessible platform such as Heroku. steps:
+ heroku login
    after this step i need to add payment method online
+ heroku create
+ git push heroku main
+ heroku config:set OPENAI_API_KEY=your_actual_api_key_here
+ heroku open
Once your backend is deployed, update your script.js file to use the Heroku URL instead of localhost:3000.



To-do list:

1. it doesn't save the chat and build on it, each message is new
1. make it look nicer
2. can it remember me and have our old chats? save my data? anonymously?
3. make it dynamically change size