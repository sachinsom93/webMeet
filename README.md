# Project : WebMeet


**Live app link** : [webmeet](https://web-meet.herokuapp.com/ "WebMeet")


## Project Purpose 
In this senerio of covid 19, when everyone is being forced
to word and socialize from home. Video chat has become
incredibly important.So, I decided to build this project that
will help people to be socialize via their web browsers. 

## Overview
WebMeet is a web application, on which a user can
create an account and then he can create separate rooms
for video conferencing. At the time of room creation 
server will automatically creates a room id , with the help
of that room id user can invite his/her friends to join his
room. After completing his meeting user can delete that
room or he can save that room for future. Beside these
there will be some more utilities to make this app user
friendly. 

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
  

  
