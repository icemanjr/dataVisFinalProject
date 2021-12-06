# Utilizing the database dump

## Prerequisites
Ensure the MongoDB Database Tool are installed. Instructions on how to install can be found 
[here](https://docs.mongodb.com/database-tools/installation/installation/).

## Creating the Database
Once the database tools are installed, cd into `dataVisFinalProject/data` and run the command `mongorestore /dump` (`mongorestore \dump` for Windows) from your
command line. This will create the database `finalProj` along with the 12 corresponding collections.