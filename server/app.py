from flask import Flask, jsonify, render_template, send_from_directory, current_app, request
from flask_socketio import SocketIO, emit, send
import os
import sys
import json
import uuid
import argparse
from flask_cors import CORS
from networkx.readwrite import json_graph

from pymongo import MongoClient

app = Flask(__name__, static_url_path='/public')
sockets = SocketIO(app)
CORS(app)

class App():
    def __init__(self):
        self.create_socket_server()
        sockets.run(app, debug = self.debug, use_reloader=True)

    # Custom print function.
    def print(self, action, data = {}):
        action = 'Action: {0}'.format(action)
        if bool(data):
            data_string = 'Data: ' + json.dumps(data, indent=4, sort_keys=True)
        else:
            data_string = ''
        log.info('[app.py] {0} {1}'.format(action, data_string))

    def create_socket_server(self):
        @sockets.on('init', namespace='/')
        def init():
            result = getIDList()
            emit('init', config_json, json=True)

        @sockets.on('reset', namespace='/')
        def reset(data):
            if self.debug:
                self.print('[Request] Reset', data)
            emit('reset', result, json=True)

        @sockets.on('search', namespace='/')
        def search(data):
            result = ''
            emit('search', result, json=True)

    def create_server(self):
        app.debug = True
        app.__dir__ = os.path.join(os.path.dirname(os.getcwd()), '')
        # App routes
        @app.route('/')
        def root():
            print("App directory", app.__dir__)
            return send_from_directory(app.__dir__, 'index.html')

if __name__ == '__main__':
    App()
