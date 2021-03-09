from .db import db
from datetime import datetime


class Flight(db.Model):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    igc_url = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    pilot = db.Column(db.String(50), nullable=False)
    copilot = db.Column(db.String(50))
    glider_model = db.Column(db.String(50), nullable=False)
    glider_class = db.Column(db.String(50), nullable=False)
    callsign = db.Column(db.String(50), nullable=False)
    registration = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='flights')
    comments = db.relationship('Comment', back_populates='flights')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "igc_url": self.igc_url,
            "date": self.date,
            "pilot": self.pilot,
            "copilot": self.copilot,
            "glider_model": self.glider_model,
            "glider_class": self.glider_class,
            "callsign": self.callsign,
            "registration": self.registration,
            "notes": self.notes,
            "comments": [comment.id for comment in self.comments],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_nested(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "igc_url": self.igc_url,
            "date": self.date,
            "pilot": self.pilot,
            "copilot": self.copilot,
            "glider_model": self.glider_model,
            "glider_class": self.glider_class,
            "callsign": self.callsign,
            "registration": self.registration,
            "notes": self.notes,
            "user": self.user.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
