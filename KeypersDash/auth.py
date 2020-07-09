from flask import Blueprint, request, redirect, render_template, url_for, session, flash
from . import db
import os
from requests_oauthlib import OAuth2Session

auth = Blueprint('auth', __name__)

OAUTH2_CLIENT_ID = "724104767223234631"
OAUTH2_CLIENT_SECRET = "LKVD3qQf5ehpr3FPCB3bTqeZT79Fy3dn"
OAUTH2_REDIRECT_URI = 'http://www.keypers.io/callback'

API_BASE_URL = os.environ.get('API_BASE_URL', 'https://discordapp.com/api')
AUTHORIZATION_BASE_URL = API_BASE_URL + '/oauth2/authorize'
TOKEN_URL = API_BASE_URL + '/oauth2/token'


if 'http://' in OAUTH2_REDIRECT_URI:
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = 'true'


def token_updater(token):
    session['oauth2_token'] = token


def make_session(token=None, state=None, scope=None):
    return OAuth2Session(
        client_id=OAUTH2_CLIENT_ID,
        token=token,
        state=state,
        scope=scope,
        redirect_uri=OAUTH2_REDIRECT_URI,
        auto_refresh_kwargs={
            'client_id': OAUTH2_CLIENT_ID,
            'client_secret': OAUTH2_CLIENT_SECRET,
        },
        auto_refresh_url=TOKEN_URL,
        token_updater=token_updater)


@auth.route('/callback')
def callback():
    if request.values.get('error'):
        return redirect(url_for('auth.logout'))
    discord = make_session(state=session.get('oauth2_state'))
    token = discord.fetch_token(
        TOKEN_URL,
        client_secret=OAUTH2_CLIENT_SECRET,
        authorization_response=request.url)
    session['oauth2_token'] = token
    return redirect(url_for('dashboard.dash'))


@auth.route('/logout')
def logout():
    if 'oauth2_token' in session.keys():
        session.pop('oauth2_token')
        logout = True
    if 'oauth2_state' in session.keys():
        session.pop('oauth2_state')
    else:
        logout = False
    return render_template("logout.html", logout=logout)
