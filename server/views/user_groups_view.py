from flask import jsonify, make_response
from flask_restful import Resource
from models import GroupMember, Group

class UserGroups(Resource):
    def get(self, user_id):
        # Get all group memberships for the user
        group_memberships = GroupMember.query.filter_by(user_id=user_id).all()
        group_ids = [membership.group_id for membership in group_memberships]

        # Get full group details for those group_ids
        groups = Group.query.filter(Group.id.in_(group_ids)).all()
        return make_response(jsonify([group.to_dict() for group in groups]), 200)
