from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('firstName', validators=[DataRequired()])
    last_name = StringField('lastName', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    image = StringField('image_file')
    password = StringField('password', validators=[DataRequired()])
