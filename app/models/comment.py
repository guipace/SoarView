from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey(
        'flights.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Datetime, nullable=False, default=datetime.now())

    flights = db.relationship('Flight', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "flight_id": self.flight_id,
            "comment": self.comment,
            "created_at": self.created_at,
        }
