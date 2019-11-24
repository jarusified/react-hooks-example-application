# Illumio-coding challenge

## Installation

``` bash
    npm install
    pip3 install -r requirements.txt
```

## First, make sure you have a MongoDB instance running, if not, start using

``` bash
    sudo service mongod start
```

## Update the token for access to SuperHero API.

1. Create a token.txt file.
2. Open the token.txt file and update it with your private token key.

## To run the server

``` bash
    python server.py
```

## To run the client

``` bash
    yarn start
```

## Notes

1. ***Testing the API:*** Since the given website for SuperHeroAPI does not give
   information about all the possible characters, I send multiple requests
   between 1 to 1000 to find how many characters do exist. From the bruteforce
   script (refer Superhero scraper.ipynb), I figured there are 732 characters in
   the data.

2. ***Data preprocessing:*** To access all the information easily, the data has
   been converted to a csv file ([link here]). To do this, I use pandas to
   perform pre-processing. The code to convert the original data into pandas
   dataframe can be found in Superhero scraper.ipynb. Use the below command line
   statement to start an instance of jupyter notebook.

   ``` bash
   #!/bin/bash
   jupyter notebook
   ```

3. ***Storing into a database:*** MongoDB or something. [TODO.]

4. ***React hooks:*** Recently, I heard about how react does not use class based
   components and I thought I should probably give React a try for the following
   reasons: 
   <https://stackoverflow.com/questions/20167194/insert-a-pandas-dataframe-into-mongodb-using-pymongo>

5. ***UI Components***

    1. ***Search component***