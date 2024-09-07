Please use role based access control to limit access to this program's folder.

Please password or passkey protect the main folder this program is in on your computer.

Please ensure that this program is also inside of an account on a computer or virtual machine that's password or passkey protected.

If you use a password for both the user login and folder, please use different passwords.

This program is currently meant to run on 1 computer or virtual machine locally without connecting to a network. This is for security and simplicity purposes.

If you want multiple people to be able to view this information and edit it, consider putting this program on a virtual machine that can be accessed remotely, and follow relevant security practices.

Please don't edit the code for the purpose of connecting the program directly with a network, thus introducing issues with encrypting data in transit and other vulnerabilities from not forcing localhost.

Keeping the technology stack minimal is part of the goal of this program. Introducing HTTPS into this if the data is kept on localhost anyways can introduce more technologies that need to be upkept for this program.

This is a demo version of the main FactorySec Guidance ERP. It uses HTML/CSS/JavaScript/Express/CouchDB.

You'll want to install CouchDB for this for the database.

Create a .env file and put the following:

COUCHDB_USER= COUCHDB_PASSWORD=

Then fill out your CouchDB username and password there.

In the IDE (integrated development environment) you use, such as maybe Visual Studio Code, open the folder for this program, go to the terminal, then type in "npm install" without the quotes and press enter to install the dependencies for this program.

To run the program, type in "node server.js" in the terminal in the IDE without the quotes while in the root folder for this program. Then, in your browser, type in "localhost:3000" without the quotes and press enter.
