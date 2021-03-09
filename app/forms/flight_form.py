from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class FlightForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    igcFile = StringField('igcFile', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    pilot = StringField('pilot', validators=[DataRequired()])
    copilot = StringField('copilot')
    glider_model = StringField('glider_model', validators=[DataRequired()])
    glider_class = StringField('glider_class', validators=[DataRequired()])
    callsign = StringField('callsign', validators=[DataRequired()])
    registration = StringField('registration', validators=[DataRequired()])
    notes = StringField('notes')
