from flask import Blueprint, render_template, session, jsonify, Markup, request, redirect
from . import db
from .auth import make_session
import os
from requests_oauthlib import OAuth2Session

dashboard = Blueprint('dashboard', __name__)
API_BASE_URL = os.environ.get('API_BASE_URL', 'https://discordapp.com/api')
OAUTH2_CLIENT_ID = "724104767223234631"
OAUTH2_CLIENT_SECRET = "LKVD3qQf5ehpr3FPCB3bTqeZT79Fy3dn"
OAUTH2_REDIRECT_URI = 'http://localhost:5000/callback'

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



@dashboard.route('/')
def home():
    return render_template('index.html')

@dashboard.route('/dashboard')
def dash():
    error = Markup('You are not a part of our discord. Click <a href="https://discord.gg/JC8nE3">here.</a>')
    discord = make_session(token=session.get('oauth2_token'))
    user = discord.get(API_BASE_URL + '/users/@me').json()
    guilds = discord.get(API_BASE_URL + '/users/@me/guilds').json()
    connections = discord.get(API_BASE_URL + '/users/@me/connections').json()
    if isinstance(guilds, dict):
        if 'message' in guilds.keys():
            if guilds['message'] == '401: Unauthorized':
                scope = request.args.get('scope','identify email connections guilds guilds.join')
                discord = make_session(scope=scope.split(' '))
                authorization_url, state = discord.authorization_url(AUTHORIZATION_BASE_URL)
                session['oauth2_state'] = state
                return redirect(authorization_url)
    elif isinstance(guilds, list):
        for i in guilds:
            if i['id'] == "698641287229866125":
                error = None
    else:
        error = f"Unknown response from Discord: {guilds}"

    # return jsonify(user=user,guilds=guilds,connections=connections)
    return render_template("dashboard.html", user=user, error=error)
