from flask import jsonify, make_response, request
from flask_restful import Api, Resource
from models import User, db

class UserResource(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()

        new_user = User(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone'],          
            password_hash=data['password'],     
            role=data['role']
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)


class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "user not found"}, 404)
        return make_response(jsonify(user.to_dict()), 200)

    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "user not found"}, 404)

        data = request.get_json()
        for attr in data:
            if hasattr(user, attr):
                setattr(user, attr, data[attr])

        db.session.commit()

        return make_response(user.to_dict(), 200)

    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"error": "user not found"}, 404)

        db.session.delete(user)
        db.session.commit()

        return make_response('', 204)
