from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        id=1,
        email='demo@email.com',
        first_name='Demo User',
        last_name='',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/default-user.png',
        password='password',
    )
    db.session.add(demo)

    guilherme_pace = User(
        id=2,
        email='pace.gui@gmail.com',
        first_name='Guilherme',
        last_name='Pace',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_guilherme_pace.jfif',
        password='password',
    )
    db.session.add(guilherme_pace)

    ken_sorenson = User(
        id=3,
        email='user3@email.com',
        first_name='Ken',
        last_name='Sorenson',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_ken_sorenson.jpg',
        password='password',
    )
    db.session.add(ken_sorenson)

    david_martin = User(
        id=4,
        email='user4@email.com',
        first_name='David',
        last_name='Martin',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_david_martin.jpg',
        password='password',
    )
    db.session.add(david_martin)

    tony_smolder = User(
        id=5,
        email='user5@email.com',
        first_name='Tony',
        last_name='Smolder',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_tony_smolder.jpg',
        password='password',
    )
    db.session.add(tony_smolder)

    glenn_yeldezian = User(
        id=6,
        email='user6@email.com',
        first_name='Glenn',
        last_name='Yeldezian',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_glenn_yeldezian.jpg',
        password='password',
    )
    db.session.add(glenn_yeldezian)

    john_swanson = User(
        id=7,
        email='user7@email.com',
        first_name='John',
        last_name='Swanson',
        country='United States of America',
        image_url='https://soarview.s3.amazonaws.com/seeder_john_swanson.jpg',
        password='password',
    )
    db.session.add(john_swanson)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
