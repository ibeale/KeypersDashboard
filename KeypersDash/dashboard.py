from flask import Blueprint, render_template, session, jsonify, Markup, request, redirect
from . import db
from .auth import make_session
import os
from requests_oauthlib import OAuth2Session
from .models import *

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


# Workout whether or not I need the make_session function called so many times. Probably want to maintain a session.
@dashboard.route('/dashboard')
def dash():
    role = "Member"
    notInDiscord = Markup(
        'You are not a part of our discord. <a class= "button is-success" href="https://discord.gg/RpqWAbH">Join Our Discord</a>')
    if 'oauth2_token' not in session.keys():
        scope = request.args.get(
            'scope', 'identify email connections guilds guilds.join')
        discord = make_session(scope=scope.split(' '))
        authorization_url, state = discord.authorization_url(
            AUTHORIZATION_BASE_URL)
        session['oauth2_state'] = state
        return redirect(authorization_url)

    else:
        error = None
        bots = None
        discord = make_session(token=session.get('oauth2_token'))
        user = discord.get(API_BASE_URL + '/users/@me').json()
        guilds = discord.get(API_BASE_URL + '/users/@me/guilds').json()
        userDB = User.query.filter_by(discordID=user['id']).first()
        adminDB = Admin.query.filter_by(discordID=user['id']).first()

        if "message" in user.keys():
            error = user['message']
            return render_template("dashboard.html", user=user, error=error, role=role, bots=bots)

        elif userDB:
            if 'admin-key' in session.keys():
                session.pop('admin-key')
            for i in guilds:
                if i['id'] == "702704645931401266":
                # if i['id'] == "382525659060240384": TEST
                    notInDiscord = None
            bots = []
            keys = userDB.api_keys
            for key in keys:
                bots.append(key.bot)
        elif adminDB:
            notInDiscord = None
            bots = Bot.query.all()
            role = "Administrator"
            session['admin-key'] = "QkkqN7VRtDGHgtQXgG6a"
            admins = Admin.query.all()
            users = User.query.all()

            # can we use a join here?
            user_dict = {}
            for u in users:
                user_dict[u.username] = []
                for key in u.api_keys:
                    rented_bot = key.bot
                    user_dict[u.username].append(
                        f"{rented_bot.name} {rented_bot.bot_id}")
            return render_template("adminDash.html", user=user, error=error, role=role, bots=bots, admins=admins, users=users, user_dict=user_dict)
        else:
            new_user = User(
                email=user['email'], username=f"{user['username']}#{user['discriminator']}", discordID=user['id'])
            try:
                print(f"Creating user {new_user}")
                db.session.add(new_user)
                db.session.commit()
                bots = []
                keys = new_user.api_keys
                for key in keys:
                    bots.append(key.bot)
                print(f"Bots: {bots}")
            except Exception as e:
                print(e)
                error = "Error creating User!"

    # return jsonify(user=user,guilds=guilds,connections=connections, role=role)
    return render_template("userDash.html", user=user, error=error, role=role, bots=bots, notInDiscord=notInDiscord)
