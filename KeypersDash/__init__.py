from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
OAUTH2_CLIENT_SECRET = "LKVD3qQf5ehpr3FPCB3bTqeZT79Fy3dn"

def create_app():
	app = Flask(__name__)
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
	app.config['SECRET_KEY'] = OAUTH2_CLIENT_SECRET
	db.init_app(app)

	from .auth import auth as auth_blueprint
	app.register_blueprint(auth_blueprint)

	from .dashboard import dashboard as dashboard_blueprint
	app.register_blueprint(dashboard_blueprint)

	from .resetAPI import resetAPI as resetAPI_blueprint
	app.register_blueprint(resetAPI_blueprint)

	return app