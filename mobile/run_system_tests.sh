#!/usr/bin/env bash
echo "IMPORTANT, YOU MUST HAVE AN ANDROID EMULATOR STARTED TO WORK"
echo "Installing Appium"
npm i -g appium-doctor
npm i -g appium
echo "Starting Appium"
appium &
echo "Installing codeceptjs"
npm install -g codeceptjs webdriverio
echo "Running codeceptjs system tests"
codeceptjs run
