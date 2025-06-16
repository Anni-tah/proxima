from flask import jsonify, make_response, request
from flask_restful import Resource
from models import Repayment, db

class RepaymentResource(Resource):
    def get(self):
        repayments = [repayment.to_dict() for repayment in Repayment.query.all()]
        return make_response(jsonify(repayments), 200)

    def post(self):
        data = request.get_json()

        # Validate required fields
        if not all(k in data for k in ("amount", "loan_id", "user_id")):
            return make_response({"error": "Missing required fields"}, 400)

        new_rep = Repayment(
            amount=data['amount'],
            loan_id=data['loan_id'],
            user_id=data['user_id']
        )

        db.session.add(new_rep)
        db.session.commit()

        return make_response(new_rep.to_dict(), 201)


class RepaymentByID(Resource):
    def get(self, id):
        rep = Repayment.query.filter_by(id=id).first()
        if not rep:
            return make_response({"error": "Repayment not found"}, 404)
        return make_response(jsonify(rep.to_dict()), 200)

    def patch(self, id):
        rep = Repayment.query.filter(Repayment.id == id).first()
        if not rep:
            return make_response({"error": "Repayment not found"}, 404)

        data = request.get_json()
        for attr in data:
            if hasattr(rep, attr):
                setattr(rep, attr, data[attr])

        db.session.commit()

        response_dict = rep.to_dict()
        return make_response(response_dict, 200)

    def delete(self, id):
        rep = Repayment.query.get(id)
        if not rep:
            return make_response({"error": "Repayment not found"}, 404)

        db.session.delete(rep)
        db.session.commit()

        return make_response('', 204)
