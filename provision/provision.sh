#!/usr/bin/env bash

if [ -e "/etc/vagrant-provisioned" ];
then
    echo "Vagrant provisioning already completed. Skipping..."
    exit 0
else
    echo "Starting Vagrant provisioning process..."
fi

# Change the hostname so we can easily identify what environment we're on:
echo "nodejs-vagrant" > /etc/hostname
# Update /etc/hosts to match new hostname to avoid "Unable to resolve hostname" issue:
echo "127.0.0.1 nodejs-vagrant" >> /etc/hosts
# Use hostname command so that the new hostname takes effect immediately without a restart:
hostname nodejs-vagrant

# Install core components
/vagrant/provision/core.sh

# Install Node.js
/vagrant/provision/nodejs.sh

# Install Redis
#/vagrant/provision/redis.sh

# GitHub repositories:
#/vagrant/sh/github.sh

touch /etc/vagrant-provisioned
