# Arduino Projection Mapping

## Setup

### Arduino

Attach three potentiometers on to A0 - A2 of the Arduino.

Upload the arduino.ino sketch from `arduino/` directory to the arduino.

### Server

Install Dependencies

    npm install

    bower install

Run the server

    node server.js
    
Unfortunately the server does not immediately receive data from the Arduino.

Head back to the Arduino IDE and open up the Serial Monitor `Tools > Serial Monitor`

After this, some jumbled mess should begin printing to the terminal that the server was started on. Close the Serial Monitor and the terminal should begin printing an array of three values.

Open `localhost:3006`