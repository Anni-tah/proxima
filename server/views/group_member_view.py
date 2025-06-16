from flask import jsonify, make_response, request
from flask_restful import Api, Resource
from models import GroupMember, db

class GroupMemberResource(Resource):
    def get(self):
        groupmembers = [groupmember.to_dict() for groupmember in GroupMember.query.all()]
        return make_response(jsonify(groupmembers), 200)

    def post(self):
        data = request.get_json()

        # Ensure required fields exist
        if 'user_id' not in data or 'group_id' not in data:
            return make_response({"error": "user_id and group_id are required fields"}, 400)

        new_groupmember = GroupMember(
            user_id=data['user_id'],
            group_id=data['group_id'],
            role=data.get('role', 'member'),
            is_signatory=data.get('is_signatory', False),
        )

        db.session.add(new_groupmember)
        db.session.commit()

        return make_response(new_groupmember.to_dict(), 201)

class GrpMemberByID(Resource):

    def get(self, id):
        group_member = GroupMember.query.filter_by(id=id).first()
        if not group_member:
            return make_response({"error": "GroupMember not found"}, 404)
        return make_response(jsonify(group_member.to_dict()), 200)

    def patch(self, id):
        group_member = GroupMember.query.filter(GroupMember.id == id).first()
        if not group_member:
            return make_response({"error": "GroupMember not found"}, 404)
        
        data = request.get_json()
        for attr in data:
            if hasattr(group_member, attr):
                setattr(group_member, attr, data[attr])

        db.session.commit()

        response_dict = group_member.to_dict()

        response = make_response(
            response_dict,
            200
        )
        return response

    def delete(self, id):
        group_member = GroupMember.query.get(id)
        if not group_member:
            return make_response({"error": "GroupMember not found"}, 404)

        db.session.delete(group_member)
        db.session.commit()

        return make_response('', 204)
