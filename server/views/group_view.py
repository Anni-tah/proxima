from flask import jsonify, make_response, request
from flask_restful import Resource
from models import Group, db

class GroupResource(Resource):
    def get(self):
        groups = [group.to_dict() for group in Group.query.all()]
        return make_response(jsonify(groups), 200)

    def post(self):
        data = request.get_json()

        # checks required fields
        required_fields = ['name', 'signatory_count', 'interest_rate', 'creator_id']
        if not all(field in data for field in required_fields):
            return make_response({"error": "Missing required fields"}, 400)

        new_group = Group(
            name=data['name'],
            signatory_count=data['signatory_count'],
            interest_rate=data['interest_rate'],
            creator_id=data['creator_id']
        )

        db.session.add(new_group)
        db.session.commit()

        return make_response(new_group.to_dict(), 201)


class GroupByID(Resource):
    def get(self, id):
        group = Group.query.filter_by(id=id).first()
        if not group:
            return make_response({"error": "Group not found"}, 404)
        return make_response(jsonify(group.to_dict()), 200)

    def patch(self, id):
        group = Group.query.filter(Group.id == id).first()
        if not group:
            return make_response({"error": "Group not found"}, 404)

        data = request.get_json()
        for attr in data:
            if hasattr(group, attr):
                setattr(group, attr, data[attr])

        db.session.commit()

        return make_response(group.to_dict(), 200)

    def delete(self, id):
        group = Group.query.get(id)
        if not group:
            return make_response({"error": "Group not found"}, 404)

        db.session.delete(group)
        db.session.commit()

        return make_response('', 204)
