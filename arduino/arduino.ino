int potPins[] = {0,1,2};

void setup() {
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < 3; i = i + 1) {
    Serial.print(analogRead(potPins[i]));
    Serial.print(i < 2 ? ',' : '\n');
  }
  delay(10);
}
