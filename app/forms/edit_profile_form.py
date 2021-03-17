from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User


class EditProfileForm(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    first_name = StringField('firstName', validators=[DataRequired()])
    last_name = StringField('lastName', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    image = StringField('image_file')
    password = StringField('password')
