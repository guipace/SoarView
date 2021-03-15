from app.models import db, Flight


def seed_flights():

    flight1 = Flight(
        id=1,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_1.igc',
        date="2021-03-11",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="Ventus2/15m",
        glider_class='15-meter',
        callsign='KM',
        registration="N318KM",
        notes=''
    )
    db.session.add(flight1)

    flight2 = Flight(
        id=2,
        user_id=3,
        igc_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson_2.igc',
        date="2021-03-09",
        pilot='Ken Sorenson',
        copilot='',
        glider_model="Ventus2/15m",
        glider_class='15-meter',
        callsign='KM',
        registration="N318KM",
        notes=''
    )
    db.session.add(flight2)

    flight3 = Flight(
        id=3,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_1.igc',
        date="2021-03-13",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes=''
    )
    db.session.add(flight3)

    flight4 = Flight(
        id=4,
        user_id=4,
        igc_url='https://soarview.s3.amazonaws.com/seeder_david_martin_2.igc',
        date="2021-03-08",
        pilot='David Martin',
        copilot='',
        glider_model="ASG29E",
        glider_class='18-meter',
        callsign='BV',
        registration="N512BV",
        notes=''
    )
    db.session.add(flight4)

    flight5 = Flight(
        id=5,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_1.igc',
        date="2021-03-07",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes=''
    )
    db.session.add(flight5)

    flight6 = Flight(
        id=6,
        user_id=5,
        igc_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder_2.igc',
        date="2021-03-06",
        pilot='Tony Smolder',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='TS1',
        registration="N318TS",
        notes=''
    )
    db.session.add(flight6)

    flight7 = Flight(
        id=7,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_1.igc',
        date="2021-03-08",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes=''
    )
    db.session.add(flight7)

    flight8 = Flight(
        id=8,
        user_id=6,
        igc_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian_2.igc',
        date="2021-03-07",
        pilot='Glenn Yeldezian',
        copilot='',
        glider_model="Discus 2c",
        glider_class='18-meter',
        callsign='KY',
        registration="N27GG",
        notes=''
    )
    db.session.add(flight8)

    flight9 = Flight(
        id=9,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_1.igc',
        date="2021-03-13",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes=''
    )
    db.session.add(flight9)

    flight10 = Flight(
        id=10,
        user_id=7,
        igc_url='https://soarview.s3.amazonaws.com/seeder_john_swanson_2.igc',
        date="2021-03-07",
        pilot='John Swanson',
        copilot='',
        glider_model="LS-8",
        glider_class='18-meter',
        callsign='NS2',
        registration="N426RE",
        notes=''
    )
    db.session.add(flight10)

    db.session.commit()


def undo_flights():
    db.session.execute('TRUNCATE flights CASCADE;')
    db.session.commit()
