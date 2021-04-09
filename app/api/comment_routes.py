from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import json
from app.config import Config
from app.models import Comment, Flight, User, db
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/<int:flightId>')
@login_required
def get_comments(flightId):
    comments = Comment.query.filter(Comment.flight_id == flightId).order_by(Comment.id).all()
    return jsonify([comment.to_dict_nested() for comment in comments])


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

        comments = Comment.query.filter(Comment.flight_id == form.data['flight_id']).order_by(Comment.id).all()
        return jsonify([comment.to_dict_nested() for comment in comments])
    return {'errors': validation_errors_to_error_messages(form.errors)}


@comment_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.get(id)
        flight_id = comment.flight_id

        comment.comment = form.data['comment']
        db.session.commit()

        comments = Comment.query.filter(Comment.flight_id == flight_id).order_by(Comment.id).all()
        return jsonify([comment.to_dict_nested() for comment in comments])
    return {'errors': validation_errors_to_error_messages(form.errors)}


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    flight_id = comment.flight_id
    db.session.delete(comment)
    db.session.commit()
    comments = Comment.query.filter(Comment.flight_id == flight_id).order_by(Comment.id).all()
    return jsonify([comment.to_dict_nested() for comment in comments])
