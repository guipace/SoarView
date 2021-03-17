from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditProfileForm
from .auth_routes import validation_errors_to_error_messages
from app.aws_s3 import s3, upload_file_to_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict_nested()


@user_routes.route('/<int:id>', methods=['POST'])
@login_required
def edit_user(id):

    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = ''
    if request.files:
        url = upload_file_to_s3(request.files['image_file'], Config.S3_BUCKET)

    if form.validate_on_submit():

        user = User.query.get(id)

        user.email = form.data['email'],
        user.first_name = form.data['first_name'],
        user.last_name = form.data['last_name'],
        user.country = form.data['country'],
        if request.files:
            user.image_url = url or 'https://soarview.s3.amazonaws.com/default-user.png',
        if form.data['password']:
            user.password = form.data['password']

        db.session.add(user)
        db.session.commit()
        return user.to_dict_nested()
    return {'errors': validation_errors_to_error_messages(form.errors)}
