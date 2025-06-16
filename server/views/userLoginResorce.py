from flask import request, jsonify, make_response
from flask_restful import Resource
from models import db, User

# Temporary in-memory store for login attempts
login_attempts = {}

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return make_response(jsonify({"message": "Email and password are required."}), 400)

        user = User.query.filter_by(email=email).first()

        if not user:
            return make_response(jsonify({"message": "User not found. Please register."}), 404)

        if email not in login_attempts:
            login_attempts[email] = 0

        if user.check_password(password):
            login_attempts[email] += 1
            if login_attempts[email] >= 3:
                return make_response(jsonify({
                    "message": "Too many failed login attempts. Please reset your password."
                }), 403)
            return make_response(jsonify({
                "message": "Incorrect password."
            }), 401)

        # Success: reset login attempts
        login_attempts[email] = 0

        return make_response(jsonify({
            "message": "Login successful.",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }), 200)
