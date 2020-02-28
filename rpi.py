# Kelden Ben-Ora
# 2.27.2020

import time
import os
import json
import requests
import busio
import board
import digitalio
import smbus
import socket
import datetime

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

# hall
# H1 = 32

# accel
# sda = 3
# scl = 5

# hall effect sensor
H1 = digitalio.DigitalInOut(board.D12)
H1.direction = digitalio.Direction.INPUT
#######################

# I/O from promicro
# gpio.setup(LI1, gpio.IN, pull_up_down=gpio.PUD_DOWN)
# gpio.setup(LI2, gpio.IN, pull_up_down=gpio.PUD_DOWN)
# gpio.setup(LI3, gpio.IN, pull_up_down=gpio.PUD_DOWN)

LI1 = digitalio.DigitalInOut(board.D16)
LI2 = digitalio.DigitalInOut(board.D20)
LI3 = digitalio.DigitalInOut(board.D21)

LI1.direction = digitalio.Direction.INPUT
LI2.direction = digitalio.Direction.INPUT
LI3.direction = digitalio.Direction.INPUT

# Setup the lasers
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

LA1.value = False
LA2.value = False
LA3.value = False
LA4.value = False

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
# print("Trial number", fn)
f = open((directory+fn), 'w')
f.write('Time, Time since last event, Event, Current Step, Lasers, Hall Effect Sensor, Light Sensors, Accelerometer\n')


def getTime():
    d = datetime.datetime.today()
    t = d.strftime('%H:%M:%S')
    return t


def dataLog(dt, event, step, lasers, hall, lights, accel):
    f.write(str(getTime()) + ', ' + str(dt) + ', ' + str(event) + ', ' + str(step) + ', ' +
            str(lasers) + ',' + str(hall) + ', ' + str(lights) + ', ' + str(accel) + '\n')


# base reading for orientation to calibrate future readings
xinit = 0
yinit = 0
zinit = 0


def accelStart():
    data0 = bus.read_byte_data(0x18, 0x28)
    data1 = bus.read_byte_data(0x18, 0x29)
    xinit = data1 * 256 + data0
    if xinit > 32767:
        xinit -= 65536
    data0 = bus.read_byte_data(0x18, 0x2A)
    data1 = bus.read_byte_data(0x18, 0x2B)
    yinit = data1 * 256 + data0
    if yinit > 32767:
        yinit -= 65536
    data0 = bus.read_byte_data(0x18, 0x2C)
    data1 = bus.read_byte_data(0x18, 0x2D)
    zinit = data1 * 256 + data0
    if zinit > 32767:
        zinit -= 65536
    return xinit, yinit, xinit


def accel(x, y, z):
    data0 = bus.read_byte_data(0x18, 0x28)
    data1 = bus.read_byte_data(0x18, 0x29)
    xAccel = data1 * 256 + data0
    if xAccel > 32767:
        xAccel -= 65536
    xAccel = xAccel - x
    data0 = bus.read_byte_data(0x18, 0x2A)
    data1 = bus.read_byte_data(0x18, 0x2B)
    yAccel = data1 * 256 + data0
    if yAccel > 32767:
        yAccel -= 65536
    yAccel = yAccel - y
    data0 = bus.read_byte_data(0x18, 0x2C)
    data1 = bus.read_byte_data(0x18, 0x2D)
    zAccel = data1 * 256 + data0
    if zAccel > 32767:
        zAccel -= 65536
    zAccel = zAccel - z
    if zAccel < -5000:
        return True
    else:
        return False


def readData():
    data = {'light1': int(LI1.value), 'light2': int(LI2.value),
            'light3': int(LI3.value), 'hall1': int(not H1.value), 'accel1': int(accel(xinit, yinit, zinit))}
    return data


def getLasers():
    r = requests.get(ip + '/lasers')
    data = r.json()
    return data


def blinkLasers(lasers):
    # blink 10 times in 6 seconds
    for i in range(10):
        # turn on for half a second if prompted
        if lasers[0] == 1:
            LA1.value = True
        if lasers[1] == 1:
            LA2.value = True
        if lasers[2] == 1:
            LA3.value = True
        if lasers[3] == 1:
            LA4.value = True
        time.sleep(.3)
        # turn off for half a second
        LA1.value = False
        LA2.value = False
        LA3.value = False
        LA4.value = False
        time.sleep(.3)


def getEvent():
    r = requests.get(ip + '/event')
    event = r.json()
    return event


# Main
stop = False
xinit, yinit, zinit = accelStart()
sensors = readData()
dataLog(0, '', 1, [0, 0, 0, 0],
        sensors['hall1'],
        [sensors['light1'], sensors['light2'], sensors['light3']],
        sensors['accel1'])
while not stop:
    d = datetime.datetime.today()

    # stopwatch functionality
    deltaTime = time.time() - temp
    temp = time.time()

    # read accelerometer
    # accel1 = accel(x0, y0, z0)
    # print(accel1)

    # check change in sensor values
    if sensors != readData():
        # Read sensor data and send it to the server
        sensors = readData()
        post = requests.post(ip + '/data', sensors)
        print(post.text)

    print("Lights:")
    print(LI1.value, int(LI1.value))
    print(LI2.value, int(LI2.value))
    print(LI3.value, int(LI3.value))
    print("Hall: " + str(int(not H1.value)))
    print("Accel: " + str(sensors['accel1']))
    print("")

    # Retrieve laser requests from server
    lasers = getLasers()
    print(lasers)
    if (lasers != [0, 0, 0, 0]):
        print('blinking')
        blinkLasers(lasers)

    # Retrieve event updates from server and end if experiment ended
    event = getEvent()
    print(event)
    if str(event[0]) is 'End':
        stop = True
    time.sleep(1)
f.close()
