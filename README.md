## EmotiChat

This chat app makes online chatting easier to understand with the inclusion of emotion detection!

Note, if you want data to persist and want to chat with users across the web, EmotiChat can be used live at https://emotichat.netlify.app/
\
If you want to test the project on your local machine, follow the steps below. 

## How to Use
- Download the full project.
- Make sure MongoDB is installed and active. 
- In your terminal, make sure you are in the `client` directory. Then, run `npm run build` followed by `npm run start`.
- Open another terminal, this time in the `server` directory, and run `npm start`
- Finally, navigate to `localhost:3000`, enter a username and a room code, and start chatting!

## Features

- Live messaging with multiple users.
- Emotion detection on every message sent (machine learning model picks between 6 different emotions with 89% accuracy)
- Messages stored in a MongoDB database so that users who join later can view previous messages.

## Built With

Node, Express, Next, React, Python, MongoDB, Socket.IO, Tailwind CSS.
\
Backend deployed on Heroku and frontend deployed on Netlify.
