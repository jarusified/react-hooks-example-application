from logger import log
import os
import pandas as pd
import requests


class State(object):
    def __init__(self):
        self.df = None
        self.map = {}
        self.token = self.read_token()
        self.url = 'https://superheroapi.com/api/' + self.token 

    def read_token(self):
        with open('./../token.txt', 'r') as f:
            token = f.read()
        return token

    def lookup_by_column(self, col_name):
        return ret

    def lookup(self, character):
        return self.df.loc[(self.df["character"] == node.callpath[-1])]

    def update_df(self, col_name, mapping):
        self.df[col_name] = self.df["nid"].apply(
            lambda node: mapping[node] if node in mapping.keys() else ""
        )
        self.df = self.df

    def grouped_df(self, attr):
        self.gdf[attr] = self.df.groupby(attr, as_index=True, squeeze=True)
        self.gdfKeys = self.gdf[attr].groups.keys()

    # Set the app-state dataframe
    def set_df(self, file_path):
        # Since file path is mostly relative. This converts to abspath using os.
        abs_file_path = str(os.path.abspath(file_path))
        self.df = pd.read_csv(abs_file_path)

    def get_all_characters(self):
        return self.df["name"].tolist()

    def get_character(self, characters, api=''):
        for character in characters:
            character_id = self.df.loc[self.df['name'] == character]['id'].tolist()[0]
        
        response = requests.get(self.url + '/' +  str(character_id) + '/' + api).text
        return response