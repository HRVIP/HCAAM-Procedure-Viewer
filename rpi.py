# Kelden Ben-Ora HRVIP UC Davis
# 3.2.2020

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
LI1 = digitalio.DigitalInOut(board.D16)
LI2 = digitalio.DigitalInOut(board.D20)
LI3 = digitalio.DigitalInOut(board.D21)

LI1.direction = digitalio.Direction.INPUT
LI2.direction = digitalio.Direction.INPUT
LI3.direction = digitalio.Direction.INPUT

# Setup the lasers
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
    event_step = r.json()
    event = ''
    step = ''
    if event_step[0]:
        event = event_step[0]
    if event_step[1]:
        step = switch(event_step[1][8:len(event_step[1])])
    return event, step


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
    global stop
    stop = False
    xinit, yinit, zinit = accelStart()
    global sensors
    sensors = readData()
    newDataFile()
    e, s = getEvent()
    dataLog(0, 'Start', s, np.array([0, 0, 0, 0]),
            sensors['hall1'],
            np.array([sensors['light1'], sensors['light2'], sensors['light3']]),
            sensors['accel1'])
    return temp, stop, xinit, yinit, zinit, sensors


# Map the step number seen in the backend to the actual step
# seen on the procedure viewer
def switch(argument):
    stepMap = {
        '0': '1',
        '0_0': '1.1',
        '0_1': '1.1.1',
        '0_2': '1.2',
        '0_3': '1.2.1',
        '0_4': '1.3',
        '0_5': '1.3.1',
        '0_6': '1.4',
        '0_7': '1.4.1',
        '0_8': '1.4.2',
        '0_9': '1.4.3',
        '1': '2',
        '1_0': '2.1',
        '1_1': '2.1.1',
        '1_2': '2.1.1.1',
        '1_3': '2.1.2',
        '1_4': '2.2',
        '1_5': '2.2.1',
        '1_6': '2.2.1.1',
        '1_7': '2.2.2',
        '1_8': '2.2.3',
        '1_9': '2.2.3.1',
        '1_10': 'Caution',
        '1_11': '2.3',
        '1_12': '2.3.1',
        '1_13': 'Tube removal video',
        '1_14': '2.4',
        '1_15': '2.4.1',
        '1_16': '2.4.1.1',
        '1_17': '2.4.2',
        '1_18': '2.4.3',
        '2': '3',
        '2_0': '3.1',
        '2_1': '3.1.1',
        '2_2': '3.2',
        '2_3': '3.2.1',
        '2_4': '3.2.2',
        '2_5': '3.2.3',
        '2_6': '3.2.4',
        '2_7': 'Caution',
        '2_8': '3.3',
        '2_9': '3.3.1',
        '2_10': 'Carburator fuel tube video',
        '2_11': '3.3.1.1',
        '2_12': '3.3.1.2',
        '2_13': '3.4',
        '2_14': '3.4.1',
        '2_15': '3.4.2',
        '2_16': '3.4.2.1',
        '2_17': '3.5',
        '2_18': '3.5.1',
        '2_19': '3.5.1.1',
        '2_20': '3.5.2',
        '2_21': '3.5.2.1',
        '2_22': '3.5.3',
        '2_23': '3.5.4',
        '2_24': '3.6',
        '2_25': '3.6.1',
        '2_26': '3.6.2',
        '3': '4',
        '3_0': '4.1',
        '3_1': '4.1.1',
        '3_2': '4.1.1.1',
        '3_3': '4.1.2',
        '3_4': '4.1.3',
        '3_5': '4.2',
        '3_6': '4.2.1',
        '3_7': '4.3',
        '3_8': '4.3.1',
        '3_9': '4.4',
        '3_10': '4.4.1',
        '3_11': '4.4.2',
        '3_12': '4.4.3',
        '3_13': '4.4.3.1',
        '4': '5',
        '4_0': '5.1',
        '4_1': '5.1.1',
        '4_2': '5.1.2',
        '4_3': '5.2',
        '4_4': '5.2.1',
        '4_5': '5.2.2',
        '4_6': '5.2.3',
        '4_7': '5.2.3.1',
        '5': '6',
        '5_0': '6.1',
        '5_1': '6.1.1',
        '5_2': '6.1.2',
        '5_3': '6.1.3',
        '5_4': '6.1.3.1',
        '5_5': '6.1.4',
        '5_6': '6.1.4.1',
        '5_7': '6.1.5',
        '5_8': '6.1.5.1',
        '5_9': '6.2',
        '5_10': '6.2.1',
        '5_11': '6.2.2',
        '5_12': '6.2.2.1',
        '5_13': 'Remove hose video',
        '5_14': '6.2.3',
        '5_15': '6.3',
        '5_16': '6.3.1',
        '5_17': '6.3.2',
        '5_18': '6.3.3',
        '5_19': '6.4',
        '6': '7',
        '6_0': '7.1',
        '6_1': '7.1.1',
        '6_2': '7.1.2',
        '6_3': '7.1.3',
        '6_4': '7.1.3.1',
        '6_5': '7.2',
        '6_6': '7.2.1',
        '6_7': '7.2.2',
        '6_8': '7.2.2.1',
        '6_9': '7.2.3',
        '6_10': '7.2.4',
        '6_11': '7.2.4.1',
        '6_12': '7.3',
        '6_13': '7.3.1',
        '6_14': '7.3.1.1',
        '6_15': '7.4',
        '6_16': '7.4.1',
        '6_17': '7.4.2'
        
    }
    return stepMap.get(argument, 'Invalid step')


# The main loop where everything happens and updates
while True:
    stop = True
    event, __ = getEvent()
    if str(event) is 'Start':
        temp, stop, xinit, yinit, zinit, sensors = startExperiment()
        
        
    while not stop:
        sensors = readData()
        # stopwatch functionality
        # dt = time.time() - temp   do not uncomment this
        temp = time.time()

        # Retrieve laser requests from server and log requests
        # Blink lasers if there is a new request
        lasers = getLasers()
        # print(lasers)
        if (lasers != [0, 0, 0, 0]):
            # print('blinking')
            dt = time.time() - temp
            temp = time.time()
            event, step = getEvent()
            dataLog(dt, event, step, lasers, sensors['hall1'], [sensors['light1'], sensors['light2'],
                                                                      sensors['light3']], sensors['accel1'])
            blinkLasers(lasers)
        elif (lasers == [0, 0, 0, 0] and getEvent()[0] is 'Lasers requested'):
            if getEvent()[1] is '' or getEvent()[1] is '':
                lasers = [0, 0, 1, 0]
                blinkLasers(lasers)
            elif getEvent()[1] is '' or getEvent()[1] is '':
                lasers = [1, 1, 0, 1]
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
        time.sleep(.1)

    # print("Lights:")
    # print(LI1.value, int(LI1.value))
    # print(LI2.value, int(LI2.value))
    # print(LI3.value, int(LI3.value))
    # print("Hall: " + str(int(not H1.value)))
    # print("Accel: " + str(sensors['accel1']))
    # print("")