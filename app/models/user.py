from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    flights = db.relationship('Flight', back_populates='user')
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "image_url": self.image_url,
            "flights": [flight.id for flight in self.flights],
            "comments": [comment.id for comment in self.comments],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_nested(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "image_url": self.image_url,
            "flights": [flight.to_dict() for flight in self.flights],
            "comments": [comment.to_dict() for comment in self.comments],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
