# Project : WebMeet


**Live app link** : [webmeet](https://web-meet.herokuapp.com/ "WebMeet")


## Project Purpose 
In this scenerio when everyone is traped inside of their houses, every person need an virtual working enviornment so they are using some popular video conferening app, 
but due to bad internet connectivity they are suffered from bad audio and video quality.

## Overview
WebMeet is a web application, on which a user can
create an account and then he can create separate rooms
for video conferencing. At the time of room creation 
server will automatically creates a room id , with the help
of that room id user can invite his/her friends to join his
room. After completing his meeting user can delete that
room or he can save that room for future. Beside these
there will be some more utilities to make this app user
friendly. WebMeet works on WebRTC that enables the user to communicate without any audio buffering.

## Technology Stack
- FrontEnd
  1. HTML
  1. CSS 
  1. Vanilla javascript
- BackEnd
  1. Node.js
  1. Express
  1. Socket.io

## Steps to run project locally 
- Step 1: 
  Open command propmt and change the current working directory to the location where you want to save the project. 
  For example
  
  ```
  $ cd C:/Users/user/my_project
  ```
- Step 2: 
  Type `git clone`, paste the repository URL and press ENTER
  ```
  $ git clone https://github.com/sachinsom93/webMeet.git
  ```
- Step 3:
  After cloning repo, navigate to webmeet
  ```
  $ cd webMeet
  ```
- Step 4:
  Install dependencies(you shoud have node.js installed in your system.)
  ```
  $ npm install
  ```
- Step 5: Edit .env file (put your mongodb URI)

- Step 6:
  Then use command
  1. Should have a internet connectivity
  ```
  $ npm run dev
  ```
  or 
  ```
  $ npm start
  ```
  -Step 7:
  Open another terminal and run the command
  ```
  peerjs --port 443 --path /peerjs
  ```
  

  
