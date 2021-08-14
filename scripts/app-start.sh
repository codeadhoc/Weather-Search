#! /bin/bash

##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /var/www/weatherapp

##Run your nodejs app
sudo node /var/www/weatherapp/src/app.js