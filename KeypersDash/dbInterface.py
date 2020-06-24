from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    discordID = db.Column(db.String(100), unique=True, nullable=False)
    api_keys = db.relationship('Apikey', backref="renter")

management = db.Table('management',
    db.Column('admin_id', db.Integer, db.ForeignKey('admin.admin_id')), 
    db.Column('bot_id', db.Integer, db.ForeignKey('bot.bot_id'))
)

class Admin(db.Model):
    admin_id = db.Column(db.Integer, primary_key=True) 
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    discordID = db.Column(db.String(100), unique=True, nullable=False)
    botsManaged = db.relationship('Bot', secondary=management, backref=db.backref("managed_by", lazy='dynamic'))

class Bot(db.Model):
    bot_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    api_key = db.relationship('Apikey', backref="bot", uselist=False)

class Apikey(db.Model):
    key_id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), nullable=False)
    bot_id = db.Column(db.Integer, db.ForeignKey('bot.bot_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    



