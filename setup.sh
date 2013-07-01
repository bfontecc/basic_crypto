#!/bin/sh

# script for loading basic full stack js functionality into server e.g. ec2

# install git
sudo apt-get install -y git-core

# update package list
sudo apt-get update

#install python, g++, and make
sudo apt-get install -y python-software-properties python g++ make

#install node.js
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs

