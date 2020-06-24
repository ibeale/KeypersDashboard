from flask import Blueprint, request, redirect, render_template, url_for, session, flash
from . import db
import requests
from time import sleep
from .resetCyber import resetCyber

resetAPI = Blueprint('resetAPI', __name__)

@resetAPI.route('/reset', methods=['POST'])
def reset():
    resetCyber("kodairental01@gmail.com", "J33pers!")
    flash("Resetting, do not refresh.")
    return redirect(url_for('dashboard.dash'))