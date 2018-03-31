# SocialNetwork backend

## How to use

``` bash
# Install dependencies for server
npm install

# Change a few things
The uws folder causes some problems with socket.io running properly, Replacing the uws folder with a proper copy of it solves the problem

# MongoDB server
MongoDB server is required, paste the MongoDB url at /config/keys

# Start Server
node server/nodemon server

```
