from flask import jsonify, make_response, request
from flask_restful import Resource
from models import Loan, db
from datetime import datetime  # ✅ Needed for parsing the due_date

class LoanResource(Resource):
    def get(self):
        loans = [loan.to_dict(rules=('-group.loans', '-user.loans', '-repayments.loan')) for loan in Loan.query.all()]
        return make_response(jsonify(loans), 200)

    def post(self):
        data = request.get_json()

        # Validate required fields
        required_fields = ['amount', 'interest_rate', 'status', 'due_date', 'repaid', 'user_id', 'group_id']
        if not all(field in data for field in required_fields):
            return make_response({"error": "Missing required fields"}, 400)

        try:
            # ✅ convert due_date string to a Python date object
            due_date_obj = datetime.strptime(data['due_date'], "%Y-%m-%d").date()
        except ValueError:
            return make_response({"error": "Invalid date format. Use YYYY-MM-DD."}, 400)

        new_loan = Loan(
            amount=data['amount'],
            interest_rate=data['interest_rate'],
            status=data['status'],
            due_date=due_date_obj,  # ✅ use the parsed date object
            repaid=data['repaid'],
            user_id=data['user_id'],
            group_id=data['group_id']
        )

        db.session.add(new_loan)
        db.session.commit()

        return make_response(new_loan.to_dict(), 201)


class LoanByID(Resource):
    def get(self, id):
        loan = Loan.query.filter_by(id=id).first()
        if not loan:
            return make_response({"error": "Loan not found"}, 404)
        return make_response(jsonify(loan.to_dict()), 200)

    def patch(self, id):
        loan = Loan.query.filter(Loan.id == id).first()
        if not loan:
            return make_response({"error": "Loan not found"}, 404)

        data = request.get_json()
        for attr in data:
            if attr == "due_date":
                try:
                    setattr(loan, attr, datetime.strptime(data[attr], "%Y-%m-%d").date())
                except ValueError:
                    return make_response({"error": "Invalid date format. Use YYYY-MM-DD."}, 400)
            elif hasattr(loan, attr):
                setattr(loan, attr, data[attr])

        db.session.commit()
        return make_response(loan.to_dict(), 200)

    def delete(self, id):
        loan = Loan.query.get(id)
        if not loan:
            return make_response({"error": "Loan not found"}, 404)

        db.session.delete(loan)
        db.session.commit()

        return make_response('', 204)
