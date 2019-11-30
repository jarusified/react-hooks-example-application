# Illumio-coding challenge

## Intreface 

![Image description](figures/interface-final.png)


## Installation

``` bash
    npm install
    pip3 install -r requirements.txt
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

3. ***Storing into a database:*** MongoDB or something. [TODO.] <https://stackoverflow.com/questions/20167194/insert-a-pandas-dataframe-into-mongodb-using-pymongo>

4. ***React hooks:*** Recently, I heard about how react does not use class based
   components and I thought I should probably give React a try for the following
   reasons: 
   1. Functional components are more stateful.
   2. 

5. ***UI Components***

    1. ***Search component*** 
       1. Search component contains a Form with *typeahead* feature.
       2. The form allows the user to select unlimited number of characters.
       3. When a user selects a character, it gets handled by
          *handleCharacterAdd* which updates the *characterList*.
       4. When the user presses *Search* button, I send a request to the server
          using sockets and gets back the data using *useCallback*.
       5. But then since I get data in one of the child components, I would be
          required to lift it up across 4 components (SearchButton -> Search ->
          Header -> App), which not a smart thing to do.
       6. To address this issue, I use *useContext*. Now any
          application component can access the *superhero* state.

Some links from where I learnt React hooks.

1. <https://frontarm.com/james-k-nelson/hooks-vs-render-props/>
2. <https://usehooks.com/>
3. <https://frontarm.com/james-k-nelson/usecontext-react-hook/>
4. <https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32>