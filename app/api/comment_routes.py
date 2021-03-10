from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import json
from app.config import Config
from app.models import Comment, Flight, db
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/', methods=['POST'])
@login_required
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        comment = Comment(
            user_id=form.data['user_id'],
            flight_id=form.data['flight_id'],
            comment=form.data['comment'],
        )

        db.session.add(comment)
        db.session.commit()

        flight = Flight.query.get(comment.flight_id)

        return flight.to_dict_nested()

    return {'errors': validation_errors_to_error_messages(form.errors)}
