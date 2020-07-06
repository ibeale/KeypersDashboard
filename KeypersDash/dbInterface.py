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

    def __repr__(self):
        return(f"User: {self.username} - DiscordID: {self.discordID} - Email: {self.email}")


class Admin(db.Model):
    admin_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    discordID = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return(f"Admin: {self.username} - DiscordID: {self.discordID} - Email: {self.email}")


class Bot(db.Model):
    bot_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bot_key = db.Column(db.String(100), nullable=False)
    bot_discord_email = db.Column(db.String(100), nullable=False)
    bot_discord_pass = db.Column(db.String(100), nullable=False)
    api_key = db.relationship('Apikey', backref="bot", uselist=False)
    bot_cookie = db.Column(db.String(10000), nullable=True)

    def __repr__(self):
        return(f"Name: {self.name} - ID: {self.bot_id} ")

    def availability(self):
        return(f'Rented by {self.api_key.renter.username}' if self.api_key else 'Available')


class Apikey(db.Model):
    key_id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), nullable=False)
    bot_id = db.Column(db.Integer, db.ForeignKey('bot.bot_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __repr__(self):
        return(f"ID: {self.key_id} - BotID: {self.bot_id} - User: {self.user_id}")
