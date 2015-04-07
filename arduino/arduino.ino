int potPins[] = {0,1,2};

void setup() {
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < 3; i = i + 1) {
    int speed = map(analogRead(potPins[i]), 0, 1023, 0, 33);
    Serial.print(speed);
    if(i < 2) Serial.print(',');
  }
  Serial.print('\n');
  delay(99);
}

