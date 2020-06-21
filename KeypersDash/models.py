from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(100), unique=True)
    discordID = db.Column(db.String(100), unique=True)
    discordOauthToken = db.Column(db.String(100))