from flask import (
    Flask,
    jsonify,
    render_template,
    send_from_directory,
    current_app,
    request,
)
from flask_socketio import SocketIO, emit, send
import os
import sys
import json
import uuid
import argparse
from flask_cors import CORS
from networkx.readwrite import json_graph
from pymongo import MongoClient

# Local imports
from state import State

app = Flask(__name__, static_url_path="/public")
sockets = SocketIO(app)
CORS(app)


class App:
    def __init__(self):
        self.debug = True
        self.state = State()
        self.state.set_df("../data.csv")

        self.create_socket_server()
        sockets.run(app, debug=self.debug, port=4000, use_reloader=True)

    # Custom print function.
    def print(self, action, data={}):
        action = "Action: {0}".format(action)
        if bool(data):
            data_string = "Data: " + json.dumps(data, indent=4, sort_keys=True)
        else:
            data_string = ""
        log.info("[app.py] {0} {1}".format(action, data_string))

    def create_socket_server(self):
        @sockets.on("init", namespace="/")
        def init(data):
            print("[Request] Init")
            result = self.state.get_all_characters()
            print(result)
            emit("init", result, json=True)

        @sockets.on("reset", namespace="/")
        def reset(data):
            print("[Request] Reset", data)
            emit("reset", result, json=True)

        @sockets.on("search", namespace="/")
        def search(data):
            print("[Request] Search: {0}".format(data))
            result = self.state.get_character(data['characters'])
            print(result)
            emit("search", result, json=True)

        @sockets.on("random", namespace="/")
        def random(data):
            print("[Request] Random: {0}".format(data))
            result = self.state.get_random_characters(data['characters'])
            print(result)
            emit("random", result, json=True)



    def create_server(self):
        app.debug = True
        app.__dir__ = os.path.join(os.path.dirname(os.getcwd()), "")
        # App routes
        @app.route("/")
        def root():
            print("App directory", app.__dir__)
            return send_from_directory(app.__dir__, "index.html")


if __name__ == "__main__":
    App()
