# Kelden Ben-Ora
# 2.27.2020

import datetime
import json
import os
import socket
import time
import requests
import board
import busio
import digitalio
import smbus
import numpy as np
# current ip address
ip = 'http://' + (socket.gethostbyaddr(socket.gethostname())[2])[0] + ':3000'
# interface and setup for the accelerometer
bus = smbus.SMBus(1)
bus.write_byte_data(0x18, 0x20, 0x27)
bus.write_byte_data(0x18, 0x23, 0x00)
i2c = busio.I2C(board.SCL, board.SDA)

######################
# Locations of sensors and lasers on rpi pins

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
global LI1, LI2, LI3
LI1 = digitalio.DigitalInOut(board.D16)
LI2 = digitalio.DigitalInOut(board.D20)
LI3 = digitalio.DigitalInOut(board.D21)

LI1.direction = digitalio.Direction.INPUT
LI2.direction = digitalio.Direction.INPUT
LI3.direction = digitalio.Direction.INPUT

# Setup the lasers
global LA1, LA2, LA3, LA4
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


# base reading for orientation to calibrate future readings
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


def blinkLasers(lasers):
    # blink 10 times in 6 seconds
    for i in range(10):
        # turn on for a third of a second if prompted
        if lasers[0] == 1:
            LA1.value = True
        if lasers[1] == 1:
            LA2.value = True
        if lasers[2] == 1:
            LA3.value = True
        if lasers[3] == 1:
            LA4.value = True
        time.sleep(.3)
        # turn off for a third of a second
        LA1.value = False
        LA2.value = False
        LA3.value = False
        LA4.value = False
        time.sleep(.3)


# write current data to the trial file
def dataLog(dt, event, step, lasers, hall, lights, accel):
    f.write(str(getTime()) + ', ' + str(dt) + ', ' + str(event) + ', ' + str(step) + ', ' +
            str(lasers) + ',' + str(hall) + ', ' + str(lights) + ', ' + str(accel) + '\n')


# retrieve current event
def getEvent():
    r = requests.get(ip + '/event')
    event = r.json()
    return event['event'], event['currentStep']


def getLasers():
    r = requests.get(ip + '/lasers')
    data = r.json()
    return data


def getTime():
    d = datetime.datetime.today()
    t = d.strftime('%H:%M:%S')
    return t


# check current trial number and set up csv
def newDataFile():
    files = []
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
    global f
    f = open((directory+fn), 'w')
    f.write('Time, Time since last event, Event, Current Step, Lasers, Hall Effect Sensor, Light Sensors, Accelerometer\n')


def readData():
    data = {'light1': int(LI1.value), 'light2': int(LI2.value),
            'light3': int(LI3.value), 'hall1': int(not H1.value), 
            'accel1': int(accel(xinit, yinit, zinit))}
    return data


# Main
def startExperiment():
    temp = time.time()
    stop = False
    xinit, yinit, zinit = accelStart()
    sensors = readData()
    newDataFile()
    dataLog(0, '', 1, np.array([0, 0, 0, 0]),
            sensors['hall1'],
            np.array([sensors['light1'], sensors['light2'], sensors['light3']]),
            sensors['accel1'])
    return temp, stop, xinit, yinit, zinit, sensors


# The main loop where everything happens and updates
while True:
    
    event, __ = getEvent()
    if str(event) is 'Start':
        temp, stop, xinit, yinit, zinit, sensors = startExperiment()
        
        
    while not stop:
        sensors = readData()
        # stopwatch functionality
        # dt = time.time() - temp   do not uncomment this
        temp = time.time()

        d = datetime.datetime.today()

        # Retrieve laser requests from server and log requests
        # Blink lasers if there is a new request
        lasers = getLasers()
        # print(lasers)
        if (lasers != [0, 0, 0, 0]):
            # print('blinking')
            dt = time.time() - temp
            temp = time.time()
            dataLog(dt, 'Lasers Reqested', '', lasers, sensors['hall1'], [sensors['light1'], sensors['light2'],
                                                                      sensors['light3']], sensors['accel1'])
            blinkLasers(lasers)


    # check change in sensor values
        if sensors != readData():
            # Read sensor data, log it, and send it to the server
            sensors = readData()
            dt = time.time() - temp
            dataLog(dt, 'Sensors updated', '', lasers, sensors['hall1'], [sensors['light1'], sensors['light2'],
                                                                        sensors['light3']], sensors['accel1'])
            post = requests.post(ip + '/data', sensors)
            print(post.text)


    # Retrieve event updates from server and end if experiment ended
        event, currentStep = getEvent()
        print(event, currentStep)
        if str(event) is 'End':
            stop = True
            f.close()
        time.sleep(.5)

    # print("Lights:")
    # print(LI1.value, int(LI1.value))
    # print(LI2.value, int(LI2.value))
    # print(LI3.value, int(LI3.value))
    # print("Hall: " + str(int(not H1.value)))
    # print("Accel: " + str(sensors['accel1']))
    # print("")