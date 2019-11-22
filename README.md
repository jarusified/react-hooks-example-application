# Illumio-coding challenge

## Installation
```
    npm install
    pip3 install -r requirements.txt
```

## First, make sure you have a MongoDB instance running, if not, start using
```
    sudo service mongod start
```

## Update the token for access to SuperHero API. 
    * Open the token.txt file and update it with your private token key. 


## To run the server
```
    python server.py
```

## To run the client

```
    yarn start
```


# Notes

Since the given website for SuperHeroAPI does not give information about all the
possible characters, I send multiple requests between 1 to 1000 to find how many
characters do exist. From the bruteforce script (refer Superhero scraper.ipynb),
I figured there are 732 characters in the data. 