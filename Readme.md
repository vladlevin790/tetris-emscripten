# Tetris Game Using Emscripten

Hello! I'm glad to see you in my repository. This is my first project using Emscripten, where I've created a classic Tetris game that runs in the browser.

## Features
- Classic Tetris gameplay.
- Responsive design for various screen sizes.
- Simple and intuitive controls.
- Score tracking and level display.

## Getting Started

To run this project, follow the steps below:

### Prerequisites

Make sure you have the following installed:
- [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) (follow the installation instructions)
- A web server (Python, PHP, or Live Server)

### Running the Project

1. **Build the Project**
   Open your terminal and navigate to the project directory. Then run:
   ```bash
        make
   ```

This will compile the C/C++ code into WebAssembly using Emscripten.

2. **Start a Web Server**
You can use any of the following methods to start a web server:

- **Using Python (3.x)**:
  ```
  python -m http.server 8000
  ```
  
- **Using PHP**:
  ``` 
  php -S localhost:8000
  ```

- **Using Live Server (if you have VS Code)**:
   1. Open the project folder in Visual Studio Code.
   2. Install the "Live Server" extension.
   3. Right-click on `index.html` and select "Open with Live Server".

3. **Play the Game**
Open your web browser and navigate to `http://localhost:8000`. Click the "Start Game" button to begin playing!

## Controls

- **W A S D**: Move and rotate the Tetris pieces.

## Contributing

Feel free to fork the repository and make your own improvements! Pull requests are welcome.
