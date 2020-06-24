from flask import Blueprint, request, redirect, render_template, url_for, session, flash
from . import db
import requests
from time import sleep

resetAPI = Blueprint('resetAPI', __name__)

@resetAPI.route('/reset', methods=['POST'])
def reset():
    flash("Resetting, do not refresh.")
    sleep(5)
    print(request.args)
    return redirect(url_for('dashboard.dash'))