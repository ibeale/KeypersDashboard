import datetime
import time
import pytz
from dbInterface import *
from appconfig import config_values

timezone=config_values['timezone']

while(True):
    rentals = Apikey.query.all()
    for rental in rentals:
        if rental.rental_end:
            if datetime.datetime.now(tz=timezone) >= timezone.localize(rental.rental_end):
                print(f"{datetime.datetime.now()} Rental is over!{rental}")
                db.session.delete(rental)
                db.session.commit()
    time.sleep(1)


