from app.models import db, Flight


def seed_flights():
    
    flight1 = Flight(

    )
    db.session.add(flight1)

    db.session.commit()


def undo_flights():
    db.session.execute('TRUNCATE flights CASCADE;')
    db.session.commit()
