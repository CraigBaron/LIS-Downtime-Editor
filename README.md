# LIS-Downtime-Editor
SD Project for UCF CS students
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The following instructions are for specifically the frontend and backend. The database has its own instructions.
These instructions are for Linux, specifically Ubuntu was used.

--------- Install Git
sudo apt install git-all

--------- Install Node
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm

--------- update node
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

Navigate to the folder that where you would
like the application to be stored

In the folder clone the repository from the github 
(git clone https://github.com/CraigBaron/LIS-Downtime-Editor)

In the main project folder run the following commands
sudo npm install
sudo npm install express --save
sudo npm install body-parser
sudo npm install mongodb
sudo npm install cors

Inside the LIS-Downtime-Editor run 
sudo npm install

Inside the frontend folder run 
sudo npm install

Inside the LIS-Downtime-Editor folder download the env file
and rename the file as .env
--------------------------------------------------------
//For running frontend and backend on seperate ports    |
                                                        |
Inside the LIS-Downtime-Editor run command              |
npm start                                               |
                                                        |
Inside the frontend folder run                          |
npm start                                               |
---------------------------------------------------------
//For running backend and having it serve the frontend  |
                                                        |
Inside the LIS-Downtime-Editor run command              |
sudo npm run azure                                      |
                                                        |
---------------------------------------------------------                                                        
