from flask import Blueprint, request, redirect, render_template, url_for, session, flash, Response
from .models import *
from . import db
import requests
from time import sleep
from .models import *
import string
import random

restAPI = Blueprint('restAPI', __name__)

@restAPI.route('/reset', methods=['POST'])
def reset():
    if 'admin-key' in session.keys():
            if session['admin-key'] == "QkkqN7VRtDGHgtQXgG6a":
                if 'bid' in request.args.keys():
                    bot = Bot.query.filter_by(bot_id=request.args['bid']).first()
                    print(f"resetting {bot.name}")
    elif 'key' in request.args.keys():
        
        api_key = Apikey.query.filter_by(key=request.args['key']).first()
        if api_key:
            bot = Bot.query.filter_by(api_key=api_key).first()
            print(f"resetting {bot.name}")

    return redirect(url_for('dashboard.dash'))

@restAPI.route('/addRenter', methods=['GET','POST'])
def add_renter():
    if request.method == 'POST':
        if 'Admin-Key' in session.keys():
            if session['Admin-Key'] == "QkkqN7VRtDGHgtQXgG6a":
                username = request.form['username']
                bot = request.form['bot']

@restAPI.route('/addAdmin', methods=['GET','POST'])
def add_admin():
    if request.method == 'POST':
        if 'admin-key' in session.keys():
            if session['admin-key'] == "QkkqN7VRtDGHgtQXgG6a":
                email = request.form['email']
                username = request.form['username']
                discordID = request.form['discordID']
                new_admin = Admin(email=email, username=username, discordID = discordID)
                db.session.add(new_admin)
                db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if 'admin-key' in session.keys():
            if session['admin-key'] == "QkkqN7VRtDGHgtQXgG6a":
                return render_template('addAdmin.html')
        else:
            return Response("You cant do that.", 401)

def randomString(stringLength=20):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

@restAPI.route('/addRental', methods=['GET', 'POST'])
def add_rental():
    if request.method == 'POST':
        if 'admin-key' in session.keys():
            if session['admin-key'] == "QkkqN7VRtDGHgtQXgG6a":
                user_id = request.args['userID']
                if 'bot' in request.form.keys():
                    bot_id = request.form['bot']
                    api_key = randomString()
                    new_rental = Apikey(key=api_key, bot_id=bot_id, user_id=user_id)
                    db.session.add(new_rental)
                    db.session.commit()
        return redirect(url_for("dashboard.dash"))
    elif request.method == 'GET':
        if 'admin-key' in session.keys():
            if session['admin-key'] == "QkkqN7VRtDGHgtQXgG6a":
                user_id = request.args['userID']
                bots = Bot.query.all()
                user = User.query.filter_by(user_id=user_id).first()
                return render_template('addRental.html', bots=bots, user_id=user_id)
        return Response("You cant do that.", 401)

                