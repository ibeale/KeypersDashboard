from . import db
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    discordID = db.Column(db.String(100), unique=True, nullable=False)
    botsRented = db.relationship('Bot', backref='renter', lazy=True)

management = db.Table('management',
    db.Column('admin_id', db.Integer, db.ForeignKey('admin.admin_id')), 
    db.Column('bot_id', db.Integer, db.ForeignKey('bot.bot_id'))
)

class Admin(db.Model):
    admin_id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    discordID = db.Column(db.String(100), unique=True, nullable=False)
    botsManaged = db.relationship('Bot', secondary=management, backref=db.backref("managed_by", lazy='dynamic'))

class Bot(db.Model):
    bot_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))


