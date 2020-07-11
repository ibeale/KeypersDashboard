from flask import Blueprint, request, redirect, render_template, url_for, session, flash, Response
from .models import *
from . import db
import requests
from time import sleep
from .models import *
import string
import random
from .resetBots import *
from json import loads
from .appconfig import config_values
from datetime import datetime, timedelta
restAPI = Blueprint('restAPI', __name__)


def checkAdmin(session):
    if 'admin-key' in session.keys():
        if session['admin-key'] == config_values['admin_key']:
            return 1
    return 0


@restAPI.route('/reset', methods=['POST'])
def reset():
    if checkAdmin(session):
        if 'bid' in request.args.keys():
            bot = Bot.query.filter_by(bot_id=request.args['bid']).first()
            try:
                bot_cookie = loads(bot.bot_cookie)
            except Exception as e:
                print(e)
                failed = "Error resetting - Invalid Cookie."
            if "cyber" in bot.name.lower():
                failed = resetCyber(bot_cookie)

            elif "kodai" in bot.name.lower():
                failed = resetKodai(bot_cookie)
            else:
                failed = "Reset for this bot is not currently supported"

            if failed:
                flash(failed)
            else:
                flash(f"{bot.name} Reset Successfully!")
                print(f"Admin resetting {bot.name}")

    elif 'key' in request.args.keys():
        api_key = Apikey.query.filter_by(key=request.args['key']).first()
        if api_key:
            bot = Bot.query.filter_by(api_key=api_key).first()
            try:
                bot_cookie = loads(bot.bot_cookie)
            except Exception as e:
                print(e)
                failed = "Error resetting - Invalid Cookie. Contact an administrator about this bot."
            if "cyber" in bot.name.lower():
                failed = resetCyber(bot_cookie)

            elif "kodai" in bot.name.lower():
                failed = resetKodai(bot_cookie)

            if failed:
                flash(failed)
            else:
                flash(f"{bot.name} Reset Successfully!")
                print(f"User resetting {bot.name}")

    return redirect(url_for('dashboard.dash'))


@restAPI.route('/addAdmin', methods=['GET', 'POST'])
def add_admin():
    if request.method == 'POST':
        if checkAdmin(session):
            email = request.form['email']
            username = request.form['username']
            discordID = request.form['discordID']
            new_admin = Admin(email=email, username=username,
                              discordID=discordID)
            db.session.add(new_admin)
            db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            return render_template('addAdmin.html')
        else:
            return Response("You cant do that.", 401)


@restAPI.route('/addBot', methods=['GET', 'POST'])
def add_bot():
    if request.method == 'POST':
        if checkAdmin(session):
            name = request.form['name']
            bot_key = request.form['bot_key']
            bot_discord_email = request.form['bot_discord_email']
            bot_cookie = request.form['bot_cookie']
            if not bot_cookie:
                bot_cookie = None
            exists = Bot.query.filter_by(bot_key=bot_key).first()
            if exists == None:
                new_bot = Bot(name=name, bot_key=bot_key,
                              bot_discord_email=bot_discord_email, bot_cookie=bot_cookie)
                db.session.add(new_bot)
                db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            return render_template('addBot.html')
        else:
            return Response("You cant do that.", 401)


def randomString(stringLength=20):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(stringLength))


@restAPI.route('/addRental', methods=['GET', 'POST'])
def add_rental():
    if request.method == 'POST':
        if checkAdmin(session):
            days = int(request.form['days'])
            hours = int(request.form['hours'])
            if days <= 0 and hours <= 0:
                rental_end = None
            else:
                timezone = config_values['timezone']
                rental_end = datetime.now(tz=config_values['timezone']) + timedelta(days=days, hours=hours)
            user_id = request.args['userID']
            bot_id = request.form['bot']
            while True:
                api_key = randomString()
                checkKey = Apikey.query.filter_by(key=api_key).first()
                if checkKey == None:
                    break
            new_rental = Apikey(
                key=api_key, bot_id=bot_id, user_id=user_id, rental_end=rental_end)
            db.session.add(new_rental)
            db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            user_id = request.args['userID']
            bots = Bot.query.all()
            user = User.query.filter_by(user_id=user_id).first()
            return render_template('addRental.html', bots=bots, user_id=user_id)
        return Response("You cant do that.", 401)


@restAPI.route('/removeRental', methods=['GET', 'POST'])
def remove_rental():
    if request.method == 'POST':
        if checkAdmin(session):
            user_id = request.args['userID']
            print(request.form['bot'])
            Apikey.query.filter_by(key=request.form['bot']).delete()
            db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            user_id = request.args['userID']
            bots = []
            user = User.query.filter_by(user_id=user_id).first()
            for api_key in user.api_keys:
                bot = Bot.query.filter_by(api_key=api_key).first()
                bots.append(bot)
            return render_template('removeRental.html', bots=bots, user_id=user_id)
        return Response("You cant do that.", 401)


@restAPI.route('/removeBot', methods=['GET', 'POST'])
def remove_bot():
    if request.method == 'POST':
        if checkAdmin(session):
            bot_id = request.form['bot']
            bot = Bot.query.filter_by(bot_id=bot_id).first()
            if bot != None:
                if bot.api_key:
                    Apikey.query.filter_by(key=bot.api_key.key).delete()
                Bot.query.filter_by(bot_id=bot_id).delete()
                db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            bots = Bot.query.all()
            return render_template('removeBot.html', bots=bots)
        else:
            return Response("You cant do that.", 401)


@restAPI.route('/removeAdmin', methods=['GET', 'POST'])
def remove_admin():
    if request.method == 'POST':
        if checkAdmin(session):
            admin_id = request.form['admin']
            admin = Admin.query.filter_by(admin_id=admin_id).first()
            if admin != None:
                Admin.query.filter_by(admin_id=admin_id).delete()
                db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            admins = Admin.query.all()
            print(admins)
            return render_template('removeAdmin.html', admins=admins)
        else:
            return Response("You cant do that.", 401)

@restAPI.route('/removeUser', methods=['GET', 'POST'])
def remove_user():
    if request.method == 'POST':
        if checkAdmin(session):
            user_id = request.form['user']
            user = User.query.filter_by(user_id=user_id).first()
            if user != None:
                if user.api_keys:
                    for key in user.api_keys:
                        Apikey.query.filter_by(key=key.key).delete()
                User.query.filter_by(user_id=user_id).delete()
                db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if checkAdmin(session):
            users = User.query.all()
            print(users)
            return render_template('removeUser.html', users=users)
        else:
            return Response("You cant do that.", 401)
