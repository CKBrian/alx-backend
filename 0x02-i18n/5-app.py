#!/usr/bin/env python3
'''Defines a Flask app module'''

from flask import Flask, render_template, request, g
from flask_babel import Babel
app = Flask(__name__)


class Config:
    '''Configurations class'''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@babel.localeselector
def get_locale() -> str:
    """
    returns local language

    Returns:
        str: Best matching locale language code
    """
    languages = app.config["LANGUAGES"]  # locale language code
    locale = request.args.get('locale')
    if locale and locale in languages:
        return locale
    return request.accept_languages.best_match(languages)


@app.route("/", strict_slashes=False)
def index() -> str:
    '''
    returns an index HTML file

    Returns:
        str: Homepage content
    '''
    user = g.user
    return render_template('5-index.html', user=user)


def get_user():
    '''returns a user dictionary or None if the ID cannot be found
       or if login_as was not passed.
    '''
    login_id = request.args.get('login_as')
    if login_id and int(login_id) in users.keys():
        id = int(login_id)
        return users[id]
    return None


@app.before_request
def before_request():
    '''Get the ID from the request URL'''
    g.user = get_user()


if __name__ == "__main__":
    app.run(debug=True)
