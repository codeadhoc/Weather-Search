#! /bin/bash
##cp /var/www/weatherapp/weatherapp.service /etc/systemd/system
##add exceutable permissions to express app
##sudo chmod +x /var/www/weatherapp/src/server.js
##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /var/www/weatherapp
##Launches the express app
##sudo systemctl daemon-reload
##sudo systemctl start weatherapp
##sudo systemctl enable weatherapp

##Run your nodejs app
sudo node /var/www/weatherapp/src/app.js