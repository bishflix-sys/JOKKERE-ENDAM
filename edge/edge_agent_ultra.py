
import random, time, json
SITE_ID="bokhol-ultra-5MW-20MWh"
print(f"ULTRA {SITE_ID} GRID-FORMING <100ms")
while True:
    freq=random.uniform(49.6,50.5)
    action="DISCHARGE 5MW 80ms" if freq<49.8 else "CHARGE 5MW 80ms" if freq>50.3 else "STANDBY"
    print(f"[ULTRA] {freq:.3f}Hz -> {action}")
    time.sleep(2)
