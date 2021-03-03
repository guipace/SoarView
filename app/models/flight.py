from .db import db
from datetime import datetime

# TODO: REVIEW FLIGHT MODEL COLUMNS


class Flight(db.Model):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    igc_url = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Time, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    glider_model = db.Column(db.String(50), nullable=False)
    launch_type = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text, nullable=False)
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
            "duration": self.duration,
            "distance": self.distance,
            "location": self.location,
            "glider_model": self.glider_model,
            "launch_type": self.launch_type,
            "notes": self.notes,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
