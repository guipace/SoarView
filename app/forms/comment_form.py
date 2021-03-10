from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    flight_id = IntegerField('flight_id', validators=[DataRequired()])
    comment = StringField('comment', validators=[DataRequired()])
