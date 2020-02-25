# Kelden Ben-Ora
# 2.21.20

import RPi.GPIO as gpio
import time
import os
import json
import requests
import busio
import board
import adafruit_lis3dh
import digitalio
import smbus
import socket

# current ip address
ip = 'http://' + (socket.gethostbyaddr(socket.gethostname())[2])[0] + ':3000'
# interface and setup for the accelerometer
bus = smbus.SMBus(1)
bus.write_byte_data(0x18, 0x20, 0x27)
bus.write_byte_data(0x18, 0x23, 0x00)
i2c = busio.I2C(board.SCL, board.SDA)

######################
# Global pin variables

# photoresistors
# LI1 = 36
# LI2 = 38
# LI3 = 40

# lasers
# LA1 = 31
# LA2 = 33
# LA3 = 35
# LA4 = 37

# hall effect sensor
H1 = digitalio.DigitalInOut(board.D12)
H1.direction = digitalio.Direction.INPUT
#######################

### I/O from promicro
# gpio.setup(LI1, gpio.IN, pull_up_down=gpio.PUD_DOWN)
# gpio.setup(LI2, gpio.IN, pull_up_down=gpio.PUD_DOWN)
# gpio.setup(LI3, gpio.IN, pull_up_down=gpio.PUD_DOWN)

LI1 = digitalio.DigitalInOut(board.D16)
LI2 = digitalio.DigitalInOut(board.D20) 
LI3 = digitalio.DigitalInOut(board.D21)

LI1.direction = digitalio.Direction.INPUT
LI2.direction = digitalio.Direction.INPUT
LI3.direction = digitalio.Direction.INPUT 

### Setup the lasers
# gpio.setup(LA1, gpio.OUT)
# gpio.setup(LA2, gpio.OUT)
# gpio.setup(LA3, gpio.OUT)
# gpio.setup(LA4, gpio.OUT)

LA1 = digitalio.DigitalInOut(board.D6)
LA2 = digitalio.DigitalInOut(board.D13) 
LA3 = digitalio.DigitalInOut(board.D19) 
LA4 = digitalio.DigitalInOut(board.D26) 

LA1.direction = digitalio.Direction.OUTPUT
LA2.direction = digitalio.Direction.OUTPUT
LA3.direction = digitalio.Direction.OUTPUT
LA4.direction = digitalio.Direction.OUTPUT

temp = time.time()
files = []

# check current trial number and set up csv
directory = "trials/"
for root, di, fils in os.walk(directory, topdown=False):
    for name in fils:
        name = name[0:-4]
        if fils:
            files.append(int(name))
if not files:
    files.append(0)
fn = str(max(files)+1)
fn = fn + '.csv'
print("Trial number", fn) 
file = open((directory+fn), 'w+')
file.write("Time", "Time since last event", "Event", "Comments")
# file.close()

def dataLog(t, dt, e):
    file.write(t, dt, e)

# base reading for orientation to calibrate future readings
xinit = 0
yinit = 0
zinit = 0
def accelStart():
    data0 = bus.read_byte_data(0x18, 0x28)
    data1 = bus.read_byte_data(0x18, 0x29)
    xinit = data1 * 256 + data0
    if xinit > 32767 :
	    xinit -= 65536
    data0 = bus.read_byte_data(0x18, 0x2A)
    data1 = bus.read_byte_data(0x18, 0x2B)
    yinit = data1 * 256 + data0
    if yinit > 32767 :
	    yinit -= 65536
    data0 = bus.read_byte_data(0x18, 0x2C)
    data1 = bus.read_byte_data(0x18, 0x2D)
    zinit = data1 * 256 + data0
    if zinit > 32767 :
	    zinit -= 65536
    return xinit, yinit, xinit
     
def accel(x, y, z):
    data0 = bus.read_byte_data(0x18, 0x28)
    data1 = bus.read_byte_data(0x18, 0x29)
    xAccel = data1 * 256 + data0
    if xAccel > 32767 :
	    xAccel -= 65536
    xAccel = xAccel - x
    data0 = bus.read_byte_data(0x18, 0x2A)
    data1 = bus.read_byte_data(0x18, 0x2B)
    yAccel = data1 * 256 + data0
    if yAccel > 32767 :
	    yAccel -= 65536
    yAccel = yAccel - y
    data0 = bus.read_byte_data(0x18, 0x2C)
    data1 = bus.read_byte_data(0x18, 0x2D)
    zAccel = data1 * 256 + data0
    if zAccel > 32767 :
	    zAccel -= 65536
    zAccel = zAccel - z
    if zAccel < -6000:
        return True
    else:
        return False
    
def getLasers():
    r = requests.get(ip + '/lasers')
    data = r.json()
    return data

# Main
stop = False
x0, y0, z0, = accelStart()
while not stop:
    # stopwatch functionality
    deltaTime = time.time() - temp
    temp = time.time()
    
    # read accelerometer
    upsideDown = accel(x0, y0, z0)
    # upsideDown = accel(accelStart())
    print(upsideDown)
    
    # need to implement accelerometer thresholding logic here
    # accel = False
    # if x/y/z > threshold:
    #  accel = True
    # else:
    #  accel = False
    ### send current sensor boolean readouts
    lightData = {'light1': int(LI1.value), 'light2': int(LI2.value),
            'light3': int(LI3.value)}
    print("Lights:")
    print(LI1.value)
    print(LI2.value)
    print(LI3.value)
    print("")
    
    post = requests.post(ip+ '/data', lightData)
    print(post.text)
    
    lasers = getLasers()
    print(lasers)
    time.sleep(.5)
    if input() == 'stop':
        stop = True