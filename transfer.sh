#!/bin/bash

# Set the paths and IP addresses
LOCAL_PATH="."
RASPBERRY_PI_IP="169.254.177.9"
RASPBERRY_PI_PATH="/home/brian/Desktop/pog"

# Transfer files using SCP
scp -r $LOCAL_PATH/* brian@$RASPBERRY_PI_IP:$RASPBERRY_PI_PATH