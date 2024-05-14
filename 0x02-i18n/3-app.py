#!/usr/bin/env python3
'''Defines a Flask app module'''

from flask import Flask, render_template, request
from flask_babel import Babel
app = Flask(__name__)


class Config:
    '''Configurations class'''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """
    returns local language

    Returns:
        str: Best matching locale language code
    """
    lang = app.config["LANGUAGES"]  # locale language code
    lang_match = request.accept_languages.best_match(lang)
    return lang_match


@app.route("/", strict_slashes=False)
def index() -> str:
    '''
    returns an index HTML file

    Returns:
        str: Homepage content
    '''
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run(debug=True)
