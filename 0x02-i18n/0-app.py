#!/usr/bin/env python3
'''Defines a Flask app module'''

from flask import Flask

@app = Flask(__name__)


@app.route("/")
def index():
    '''returns an index HTML file'''
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
