from app.models import db, Flight


def seed_flights():

    flight1 = Flight(
        id=1,
        user_id=3,
        igc_url='',
        date='',
        pilot='',
        copilot='',
        glider_model='',
        glider_class='',
        callsign='',
        registration='',
        notes=''
    )
    db.session.add(flight1)

    db.session.commit()


def undo_flights():
    db.session.execute('TRUNCATE flights CASCADE;')
    db.session.commit()
