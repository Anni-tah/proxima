from flask import jsonify, make_response, request
from flask_restful import Api, Resource
from models import Savings, db

class SavingsResource(Resource):
    def get(self):
        savings = [saving.to_dict() for saving in Savings.query.all()]
        return make_response(jsonify(savings), 200)

    def post(self):
        data = request.get_json()

        # Validate required fields
        required_fields = ['amount', 'user_id', 'group_id']
        for field in required_fields:
            if field not in data:
                return make_response({"error": f"{field} is required"}, 400)

        new_saving = Savings(
            amount=data['amount'],
            is_dividend_eligible=data.get('is_dividend_eligible', True),
            user_id=data['user_id'],
            group_id=data['group_id']
        )

        db.session.add(new_saving)
        db.session.commit()

        return make_response(new_saving.to_dict(), 201)

class SavingsById(Resource):

    def get(self, id):
        saving = Savings.query.filter_by(id=id).first()
        if not saving:
            return make_response({"error": "Saving not found"}, 404)
        return make_response(jsonify(saving.to_dict()), 200)

    def patch(self, id):
        saving = Savings.query.filter(Savings.id == id).first()
        if not saving:
            return make_response({"error": "Saving not found"}, 404)

        data = request.get_json()
        for attr in data:
            if hasattr(saving, attr):
                setattr(saving, attr, data[attr])

        db.session.commit()

        response_dict = saving.to_dict()

        return make_response(response_dict, 200)

    def delete(self, id):
        saving = Savings.query.get(id)
        if not saving:
            return make_response({"error": "Saving not found"}, 404)

        db.session.delete(saving)
        db.session.commit()

        return make_response('', 204)