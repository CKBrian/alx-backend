#!/usr/bin/env python3
'''Defines a Flask app module'''

from flask import Flask, render_template, request
from flask_babel import Babel, gettext, _
app = Flask(__name__)


class Config:
    '''Configurations class'''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """returns local language"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/", strict_slashes=False)
def index():
    '''returns an index HTML file'''
    home_title = gettext('Welcome to Holberton')
    home_header = gettext('Hello world')
    return render_template('0-index.html',
                           home_header=home_header,
                           home_title=home_title)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
