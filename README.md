# react-video-chat

## INSTALLATION INSTRUCTIONS

1.  Clone the repo using the following command:

        $ git clone https://github.com/atreya221/react-video-chat.git

2.  In the project directory run the following command to install the required node modules at the server end from package.json:

        $ npm i

3.  Move into the client directory and run the following command to install the client-side node dependencies:

        $ npm i

4.  The project is now completely installed on your local system.

## Starting the server

In the project directory run the following command to start the app server on https://localhost:5000:

        $ node index.js

## Starting the app client

Move into the client directory and run the following command to start the app (client) on https://localhost:3000:

        $ npm start

## TECH STACK USED

1. Web Application
2. Backend- Node JS
3. Frontend- React JS
4. Video Calling- WebRTC (using simple-peer API), socket IO
5. Chat- Scaledrone API
6. Database- MySQL

## FEATURES

### Authentication page

#### 1. Registration

- Details required – name, username, password
- Registration possible only when all the details are filled
- Unique username is required
- Password is protected using hash
- Successful registration ask user to login to enter the app
- Register button

#### 2. Login

- Details required – username, password
- Login possible only after registration
- Wrong username/password combination generates warning
- Successful login take user to the app
- Login button

### App

#### 1. Contact info pop up button

- Cross button to close the pop up
- Name of the user at the top
- Copy to clipboard button
- Space to write username of the person user wants to call
- Call button to make a call
- Ringtone at the time of calling
- Call button changes into connected

#### 2. Call Notification

- Getting any call generates notification
- Name of the person calling appears
- Green button for accepting the call
- Red button for declining the call
- Ringtone for incoming calls

#### 3. Video player

- User’s video is visible all the time
- Caller’s/ Callee’s video occur when call is received
- Username is displayed at the top of the video

#### 4. Chat

- Toggle button to pop the chat
- Cross button at the top to close the popup
- Text box to enter the message
- Send button to send the message
- Username of the message sender appears at the top of the message
- Chat possible before/during/ after the call
- Sent messages appear on the right & received messages appear on the left
- Messages are saved even after call is disconnected
- Messages are removed only after logging out

#### 5. Toggle mic button

#### 6. Toggle video button

#### 7. Toggle screen share button

#### 8. Current time and name of the user at the bottom left corner

#### 9. Logout button

## USER GUIDE

#### 1st step: Registration

1. If you are new to the app, the you first need to register into the app. Details require for registration is name, username, and password.
2. First columns ask for name, second ask for username, and third column ask for password.
3. Fill all the details and click on the register button at the bottom of all the columns.
4. For a successful registration, you need to fill all the details. Skipping any column will show a message “Please fill all the details”.
5. For a successful registration, you need to fill a unique username. If the username already exists then a text will appear saying “Username already in use, please try something different”.
6. If 5th point is the case with you, then fill any other username and then try to register.
7. If registration is done successfully, then a message will appear saying, “Registered Successfully, Login to enter the app “.

#### 2nd step: Login

1. To login into the app, you need to fill username and password that you used while registration in the two columns shown under the Login heading.
2. After filling the required credentials, click on the login button which is present below the columns.
3. Login without registration will show a message “user doesn’t exist”.
4. If username or password doesn’t match with the details filled during the time of registration, then a message will appear showing “Wrong username/password combination!”
5. Successful login will take you to the app.

#### 3rd step: Inside the app

#### 1. Steps to make a video call

- Click on contact info icon on the right side of the button at the bottom of the app. A popup will appear showing a “Welcome” text and your name.
- Copy or write the username of the person you want to call in the column asking for “user to call” and click on the call button below it.
- If the call is made successfully, then you will hear a ringtone. Wait for the other person to receive your call.
- Otherwise, check your internet connection, refresh our window and try to call again.

#### 2. Steps to receive a call

- When someone is calling you, a ringtone and a notification showing username of the caller will appear at the top.
- There will be two buttons along with the name of the caller.
- Click on the red button to decline the call.
- Click on the green button to receive the call.

#### 3. Steps to chat

- Click on contact info icon on the right side of the button at the bottom of the app. A popup will appear showing a “ChatMate” text at the top.
- Enter your message in the column at the bottom of the popup and click on send button at the right of this column.
- You can see you message in the chat box with you your username at the top of the message.

#### 4. Steps to turn on/off your mic/video

- Click on the button with a mic icon at the centre of the bar to turn on/off your mic before/during/after the call.
- Click on the button with a video icon at the centre of the bar to turn on/off your video before/during/after the call.

#### 5. Steps to use screen share feature

- Click on the button with a screenshare icon at the centre of the bar to turn on/off your screenshare before/during/after the call.
- Screen share will appear only at your side and will not be visible at the user side

#### 6. Steps to logout

- Click on the button with a logout icon at the bottom left corner to log out form the app. This will take you the authentication page.


## FUTURE SCOPE

#### 1.  Will be working on screen share feature to make it function correctly
#### 2.  Group calling feature
#### 3.  File sharing option in chat
#### 4.  Authentication through email
