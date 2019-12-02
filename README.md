# Illumio-coding challenge

## Interface 

***Front Card view***
![Image description](figures/interface-final-front.png)

***Back Card view***
![Image description](figures/interface-final-back.png)


## Installation

``` bash
    yarn install
    pip3 install -r requirements.txt
```

## Update the token for access to SuperHero API.

1. Create a token.txt file.
2. Open the token.txt file and update it with your private token key.

## To run the server

``` bash
   cd server
   python3 app.py
```

## To run the client

``` bash
   cd ..
   yarn start
```

## Notes

1. ***Testing the API:*** Since the given website for SuperHeroAPI does not give
   information about all the possible char acters, I sent multiple requests
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

3. ***Server:*** Server is a simple Flask server that uses sockets to
   communicate with the client. I preferred websockets over REST calls for one
   reason: data transfer overhead. Every time we send a REST request, the server
   has to send the entire header again and again. In contrary, websockets send
   the header in the first connect and would not require to send header in the
   next requests.

4. ***Client:***
   1. ***Interface:***  To build the interface, I used react-bootstrap and some
      other companion packages to support flip interaction, typeahead for
      allowing users to type in the Search field. 

   1. ***Why React hooks:*** Recently, I heard about how react got rid of
      binding render props multiple times in class-based components with the
      introduction of functional components, called React hooks. And I thought I
      should probably this a try. My experience with React is still novice and I
      had to learn by figuring out how to use functional components.

   2. ***Header component***
      1. Header component contains a button to generate random 10 characters.
      2. I implemented this to easen my efforts while debugging by not requiring
         to search using the search input field.
      3. Clicking again and again refreshes the `characterList`.

   3. ***Search component*** 
      1. Search component contains a Form with *typeahead* feature.
      2. The form allows the user to select unlimited number of characters.
      3. When a user selects a character, it gets handled by
         `handleCharacterAdd` which updates the *characterList*.
      4. When the user presses *Search* button, I send a request to the server
         using sockets and gets back the data into `global socket state`.
      5. To implement a `global socket state`, I use `useContext` for the socket
         (see socket contexts section).

   4. ***Character component***
      1. Character component contains a `CardGroup` with each card possessing
         the flip animation.
      2. Instead of redirecting to a separate `Route`, I used flip interaction.
      3. Click on the button to flip all the cards.
      4. For styling, I used styled-components to use a react way of doing CSS.
      5. I did some data pre-preprocessing to make sure there are no empty
         fields or unknown values. 

   5. ***Socket Contexts:*** 
      1. Initially, I used a useSocket hook with a useCallBack to send the
         `emit` function (see src/hooks/socket.js). But this choice was problematic
         because the hook would not actually know when the response is sent. 
      2. As second approach, I learnt about `useCallback` and now I was able to
         implement asynchronous code to get back the data (see
         src/components/searchButton.js for this implementation). This resolved the
         previous issue, but each component would have to duplicate the code to
         make a socket call. This implies multiple socket connections, which is
         bad again.
      3. Next, I did some more reading, I figured a better way to solve this
         issue using `UseContext` and `UseProvider` hooks (see /src/sockets) to
         create a global context for Sockets. With this implementation, we can
         store the received data into a `global state`.

   6. ***Visualization:***
      1. Though visualization is my field of research, I spent a lot of time
         getting the architecture right and I eventually had just few hours for
         the visualization.
      2. I apologize for my lack of time management, which is mainly because I
         am working towards a deadline for a conference submission and had to
         juggle between them to make this work. Therefore, in a better timeframe
         I could have done much more. 
      3. ***Donut chart:*** This is a simple pie chart that uses `d3.pie` to
         calculate the arc sizes based on the `powerstat` values. This view is
         good to summarize a superhero's powerstat but in general suffers to
         scale to the comparison task because it is particularly hard to specify
         the arc angles that wont confuse the end user. Also, it is particularly
         hard to scale comparison to more than 2 superheroes.
      4. ***Radar chart*** In contrast, radar chart assigns an axis for each
         attributes like `power`, `combat`, etc., and uses paths to connect the
         values for each attribute. Multiple targets can be compared by just
         superimposing the paths from different superheros.
      5. Instead of just using D3 to control the DOM, I use `useEffect` to pass
         the control to React whenever an update occurs. Additionally, I use
         `arctween` to update the data values and use `transitions` to create an
         animated effect.

Some links from where I learnt React hooks.

1. <https://frontarm.com/james-k-nelson/hooks-vs-render-props/>
2. <https://usehooks.com/>
3. <https://frontarm.com/james-k-nelson/usecontext-react-hook/>
4. <https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32>
5. <https://medium.com/@alexboots/using-react-context-with-socket-io-3b7205c86a6d>
6. <https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32>

## Issues left

***Incosistent Card sizes.***
Card heights depend on how much text is being displayed. This leads to inconsistent card sizes. 

***Arctween does not work always.*** There is some weird state management error
that sets NaN to `prevData` and sometimes arctween does not really work. 

***Flip card button not integrated completely.*** I used a button to flip all
the cards simultenously due to lack of time. I was initially planning to set
state for each card and the user can choose which card to flip. 

***Target superhero needs to specified manually.*** Current code assumes that we
are always comparing with the super hero in the index 0 of
`currentCharacterList`. My initial goal was to integrate click on the star
button to add the powerstats to all the `radarCharts`.

***Parsing the powerstats not done correct.*** Some characters have null values
for the powerstats and needs to be preprocessed before visualization. 

***Organization for the Character component*** Since this was the last component
I worked on the code looks pretty unorganized, I apologize for that. I would
have to abstract the Cards into `FrontCard` and `BackCard`, separate the styles
to a new file, and separate the parsing of fields. 