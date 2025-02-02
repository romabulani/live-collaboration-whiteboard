# Live Collaboration Whiteboard Backend

This project is a backend server for a live collaboration whiteboard, where users can draw and share their drawings in real-time. It uses **Express**, **Socket.IO**, and **File System (fs)** to handle communication between users and persist drawings in a JSON file.

## Features

- **Real-time Collaboration**: Multiple users can draw on the whiteboard at the same time, and their drawings will be broadcasted to all connected clients.
- **Persistent Storage**: Drawings are saved to a `drawings.json` file on the server, ensuring that drawings persist even when users disconnect.
- **Clear the Whiteboard**: Users can clear the whiteboard, which will reset the shared drawings for everyone.

## Technologies Used

- **Express**: Web server framework for handling HTTP requests.
- **Socket.IO**: Enables WebSocket connections for real-time communication between users.
- **fs (File System)**: Used to read and write to the `drawings.json` file for persistent storage.
- **CORS**: To handle cross-origin requests from the frontend.

## Installation

Follow these steps to get your backend server running:

1. **Clone the repository** or download the code.
   
   ```
   git clone https://github.com/romabulani/live-collaboration-whiteboard.git
   cd live-collaboration-whiteboard
   ```
2. Install the required dependencies:

    Run the following command to install all the required dependencies for the project:
    ```
    npm install
    ```

3. Run the server:

    After installing the dependencies, you can start the server with:

    ```
    node server.js
    ```
    The server will start and listen on port 3000. 


## How It Works
**WebSocket Connection:** The server uses Socket.IO to listen for WebSocket connections. When a client connects, the server assigns a socket ID to that user.

**Loading Previous Drawings:** Upon connection, the server sends the stored drawings from the drawings.json file to the newly connected user. This allows them to see the previous drawings made by others.

**Drawing Events:**
Clients emit a draw event with the drawing data (like coordinates or strokes) to the server.
The server listens for these events, updates the drawings array, and saves it to drawings.json.
The server then broadcasts the drawing data to all connected clients, so they can see the new drawing in real-time.
Clear Whiteboard:

A client can emit a clear event to signal that the whiteboard should be cleared.
The server clears the drawings.json file and broadcasts the clear event to all connected clients, resetting the whiteboard.
Persistent Data Storage:

Drawings are stored in the `drawings.json` file on the server. This ensures that the drawings are preserved across server restarts.
If the file doesn't exist, it is initialized as an empty array ([]).

## Endpoints
**GET /:**
Returns a simple welcome message.

**WebSocket events:**
- **connect:** Triggered when a new user connects to the server.
- **draw:** Triggered when a user draws on the whiteboard. The drawing data is sent to the server and broadcasted to other clients.
- **clear:** Triggered when the whiteboard is cleared, and it resets the drawing data for all users.

##Frontend URL
The frontend is hosted on [Netlify](https://draw-on-whiteboard.netlify.app/), and it is designed to communicate with the backend server using WebSockets.
