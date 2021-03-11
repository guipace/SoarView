from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import json
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

    if form.validate_on_submit() and request.files:
        url = upload_file_to_s3(request.files['igcFile'], Config.S3_BUCKET)

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


@flight_routes.route('/recent')
@login_required
def recent_flights(id):
    flights = Flight.query.order_by(Flight.date.desc()).limit(20)
    return jsonify([flight.to_dict_nested() for flight in flights])


@flight_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_flight(id):
    data = json.loads(request.data)

    pilot = data['pilot']
    copilot = data['copilot']
    glider_model = data['glider_model']
    glider_class = data['glider_class']
    callsign = data['callsign']
    registration = data['registration']
    notes = data['notes']

    flight = Flight.query.get(id)
    flight.pilot = pilot
    flight.copilot = copilot
    flight.glider_model = glider_model
    flight.glider_class = glider_class
    flight.callsign = callsign
    flight.registration = registration
    flight.notes = notes

    db.session.commit()
    return flight.to_dict_nested()


@flight_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_flight(id):
    flight = Flight.query.get(id)
    db.session.delete(flight)
    db.session.commit()
    return flight.to_dict_nested()
