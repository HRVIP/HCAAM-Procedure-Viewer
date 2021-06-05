# Kelden Ben-Ora HRVIP UC Davis
# 6.5.2021

import datetime
import json
import os
import socket
import time

import numpy as np
import requests

import board
import busio
import digitalio
import smbus

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


def accel(z):

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

    global zinit
    data0 = bus.read_byte_data(0x18, 0x2C)
    data1 = bus.read_byte_data(0x18, 0x2D)
    zinit = data1 * 256 + data0
    if zinit > 32767:
        zinit -= 65536
    return zinit


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
            str(lasers) + ', ' + str(hall) + ', ' + str(lights) + ', ' + str(accel) + ', ' + ', \n')


def endExperiment():
    print('Experiment ended')
    event, currentStep = getEvent()
    lasers = getLasers()
    sensors = readData()
    dt = '%.3f' % (time.time() - temp)
    dataLog(dt, 'End', currentStep, np.array(lasers), sensors['hall1'],
            np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])
    f.close()


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
    return str(event), str(step)


def getLasers():
    r = requests.get(ip + '/lasers')
    data = r.json()
    return data


def getTime():
    d = datetime.datetime.today()
    t = d.strftime('%H:%M:%S.%f')
    return t


# check current trial number and set up csv
def newDataFile():
    # files = []
    directory = "/home/pi/hcaamviewer/trials/"

    # read current trial file numerical names and increment current
    # for root, di, fils in os.walk(directory, topdown=False):
    #     for name in fils:
    #         name = name[0:-4]
    #         if fils:
    #             files.append(int(name))
    # if not files:
    #     files.append(0)
    # fn = str(max(files)+1)
    # fn = fn + '.csv'

    subject = requests.get(ip + '/subject').json()
    group = requests.get(ip + '/group').json()
    d = datetime.datetime.today()
    date = d.strftime('%m-%d-%Y')
    t = d.strftime('_%H-%M')
    fn = date + t + str(subject) + '_' + str(group) + '.csv'
    # Tell the server what the current trial file is called
    r = requests.post(ip + '/fileName', {'file': fn})
    # subject = requests.get(ip + '/subject').json()
    # group = requests.get(ip + '/group').json()
    # print("Trial number", fn)
    if not os.path.exists(directory):
        os.mkdir(directory)
    global f
    f = open((directory+fn), 'w')
    print("Created new file")
    f.write('Time, Time since last event, Event, Current Step, Lasers, Hall Effect Sensor, Light Sensors, Accelerometer, ' +
            subject+group+', '+datetime.datetime.today().strftime('%m-%d-%Y')+'\n')


def readData():
    data = {'light1': int(LI1.value), 'light2': int(LI2.value),
            'light3': int(LI3.value), 'hall1': int(H1.value),
            'accel1': int(accel(zinit))}
    return data


# Main
def startExperiment():
    print("Experiment started")
    temp = time.time()
    stop = False
    zinit = accelStart()
    global sensors
    sensors = readData()
    newDataFile()
    e, s = getEvent()
    dataLog(0, 'Start', s, np.array([0, 0, 0, 0]),
            sensors['hall1'],
            np.array([sensors['light1'], sensors['light2'], sensors['light3']]),
            sensors['accel1'])
    return temp, stop, zinit, sensors


# Map the step number seen in the backend to the actual step
# seen on the procedure viewer
def switch(argument):
    stepMap = {
        '0': '1',
        '0_0': '1.1',
        '0_1': '1.2',
        '0_2': '1.3',
        '0_3': '1.4',
        '0_4': '1.5',
        '0_5': '1.5.1',
        '1': '2',
        '1_0': '2.1',
        '1_1': '2.2',
        '1_2': '2.3',
        '1_3': '2.4',
        '1_4': '2.5',
        '1_5': 'Caution',
        '1_6': '2.6',
        '1_7': '2.6.1',
        '1_8': 'Tube removal video',
        '1_9': '2.7',
        '1_10': '2.8',
        '1_11': '2.9',
        '2': '3',
        '2_0': '3.1',
        '2_1': 'Caution',
        '2_2': '3.2',
        '2_3': 'Carburator fuel tube video',
        '2_4': '3.3',
        '2_5': '3.4',
        '2_6': '3.5',
        '2_7': '3.6',
        '2_8': '3.6.1',
        '2_9': '3.6.2',
        '2_10': '3.6.3',
        '2_11': 'Caution',
        '2_12': '3.7',
        '2_13': '3.7.1',
        '3': '4',
        '3_0': '4.1',
        '3_1': '4.2',
        '3_2': '4.3',
        '3_3': '4.4',
        '3_4': '4.5',
        '3_5': '4.6',
        '3_6': '4.6.1',
        '4': '5',
        '4_0': '5.1',
        '4_1': '5.2',
        '4_2': '5.3',
        '4_3': '5.4',
        '4_4': '5.5',
        '5': '6',
        '5_0': '6.1',
        '5_1': '6.2',
        '5_2': '6.3',
        '5_3': '6.4',
        '5_4': '6.5',
        '5_5': '6.6',
        '5_6': '6.7',
        '5_7': 'Remove hose video',
        '5_8': '6.8',
        '5_9': '6.9',
        '5_10': '6.10',
        '5_11': '6.11',
        '5_12': '6.12',
        '6': '7',
        '6_0': '7.1',
        '6_1': '7.2',
        '6_2': '7.3',
        '6_3': '7.4',
        '6_4': '7.5',
        '6_5': '7.6',
        '6_6': '7.7',
        '6_7': '7.8',
        '6_8': '7.9',
        '6_9': '7.10',

    }
    return stepMap.get(argument, 'Invalid step')


global stop
stop = True
global temp

# The main loop where everything happens and updates
while True:
    # Check for updates on events and keep track of current step
    event, currentStep = getEvent()
    # print(event, currentStep)
    # print(event)
    # print(currentStep)

    # start or end experiment
    if str(event) == 'Start':
        # print(event)
        temp, stop, zinit, sensors = startExperiment()
    # if str(event) == 'End':
        # print("Experiment ended")

    while not stop:
        # print("temp: " + str(temp))
        sensors = readData()
        # print("sensors: " + str(sensors))

        # Turn on the screwdriver if they are on the right step
        # if currentStep in ['2.1.1', '2.2.1', '7.2.4', '7.3.1']:
        # print('Screwdriver blinking')
        # client.publish('test', '1')

        # Retrieve laser requests from server and log requests
        # Blink lasers if there is a new request
        lasers = getLasers()
        # print("lasers: " + str(lasers))
        # print(lasers)

        # Check if the step has changed
        newEvent, newCurrentStep = getEvent()
        if (newCurrentStep != currentStep):
            # print("Updated step")
            dt = '%.3f' % (time.time() - temp)
            temp = time.time()
            dataLog(dt, newEvent, newCurrentStep, np.array(lasers), sensors['hall1'],
                    np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])
        currentStep = newCurrentStep
        event = newEvent

        if (lasers != [0, 0, 0, 0]):
            dt = '%.3f' % (time.time() - temp)
            # print("delta time: " + dt)
            temp = time.time()
            # print('Event: ' + event)
            # print('Step: ' + currentStep)
            dataLog(dt, event, currentStep, np.array(lasers), sensors['hall1'],
                    np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])
            blinkLasers(lasers)
        # With the new laser code, I'm not sure if this is necessary anymore
        elif (lasers == [0, 0, 0, 0] and event == 'Lasers requested'):
            if currentStep == '2.3' or currentStep == '7.7':
                dt = '%.3f' % (time.time() - temp)
                temp = time.time()
                dataLog(dt, 'Lasers requested', currentStep, np.array(lasers), sensors['hall1'],
                        np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])
                lasers = [0, 0, 1, 0]
                # print('blinking ' + str(lasers))
                blinkLasers(lasers)
            elif currentStep == '2.7' or currentStep == '7.3':
                dt = '%.3f' % (time.time() - temp)
                temp = time.time()
                dataLog(dt, 'Lasers requested', currentStep, np.array(lasers), sensors['hall1'],
                        np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])
                lasers = [1, 1, 0, 1]
                # print('blinking ' + str(lasers))
                blinkLasers(lasers)

        post = requests.post(ip + '/data', sensors)
        # check change in sensor values
        if sensors != readData():
            # print('sensors updated')
            # Read sensor data, log it, and send it to the server
            sensors = readData()
            dt = '%.3f' % (time.time() - temp)
            temp = time.time()
            dataLog(dt, 'Sensors updated', currentStep, np.array(lasers), sensors['hall1'],
                    np.array([sensors['light1'], sensors['light2'], sensors['light3']]), sensors['accel1'])

        # End if experiment ended
        if str(event) == 'End':
            endExperiment()
            stop = True
