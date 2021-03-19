from app.models import db, Comment
import random

COMMENTS = ["Great flight!",
            "Way to go finishing the task",
            "The weather must have been great for that one!",
            "That's a pretty long one",
            "Awesome!",
            "How did you manage to get back?",
            "Killing it!",
            "Way to go!",
            "Too bad I couldn't make it out to the field as well",
            "We have to team up some time",
            "Nice one",
            "Seems like someone keeps improving!",
            "Always great flying with you",
            "Look forward to another flight like this",
            "Great day to fly",
            "Seems like it was a challenging day",
            "Beautiful weather to fly in!",
            "Not very fast, but always good to fly",
            "Nice flying!"]


def seed_comments():
    for i in range(75):
        comment = Comment(
            user_id=random.randrange(1, 7),
            flight_id=random.randrange(1, 26),
            comment=COMMENTS[random.randrange(0, len(COMMENTS))],
        )
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.commit()
