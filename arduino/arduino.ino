int i = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(String(i) + ',' + String(i) + ',' + String(i));
  i++;
  delay(100);
}

