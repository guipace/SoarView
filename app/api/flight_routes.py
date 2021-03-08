from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.aws_s3 import s3, upload_file_to_s3
from app.config import Config
from app.models import Flight, db
from app.forms import FlightForm
from .auth_routes import validation_errors_to_error_messages

flight_routes = Blueprint('flight', __name__)


@flight_routes.route('/', methods=['POST'])
@login_required
def uploadFlight():
    form = FlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = ''
    if request.files:
        url = upload_file_to_s3(request.files['igcFile'], Config.S3_BUCKET)

    if form.validate_on_submit():
        flight = Flight(
            user_id=form.data['user_id'],
            igc_url=url,
            date=form.data['date'],
            pilot=form.data['pilot'],
            copilot=form.data['copilot'],
            glider_model=form.data['glider_model'],
            glider_class=form.data['glider_class'],
            callsign=form.data['callsign'],
            registration=form.data['registration'],
            notes=form.data['notes'],
        )
        db.session.add(flight)
        db.session.commit()
        return flight.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@flight_routes.route('/<int:id>')
@login_required
def flight(id):
    flight = Flight.query.get(id)
    return flight.to_dict_nested()
