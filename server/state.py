from logger import log
import os
import pandas as pd


class State(object):
    def __init__(self):
        self.df = None
        self.map = {}

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
