from flask import jsonify, make_response
from flask_restful import Resource
from sqlalchemy import func
from models import db, Group, Savings

class GroupSavingsResource(Resource):
    def get(self):
        
        results = (
            db.session.query(
                Group.id,
                Group.name.label("group_name"),
                func.coalesce(func.sum(Savings.amount), 0).label("total_savings")
            )
            .outerjoin(Savings, Group.id == Savings.group_id)
            .group_by(Group.id)
            .order_by(func.sum(Savings.amount).desc())
            .all()
        )

        group_savings = [
            {
                "id": result.id,
                "group_name": result.group_name,
                "total_savings": float(result.total_savings)
            }
            for result in results
        ]

        return make_response(jsonify(group_savings), 200)
