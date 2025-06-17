from flask_restful import Resource
from models import Loan
from flask import jsonify, make_response

class UserLoanStats(Resource):
    def get(self, user_id):
        loans = Loan.query.filter_by(user_id=user_id).all()

        total_active = sum(l.amount for l in loans if l.status == "active")
        outstanding_balance = sum(
            l.amount for l in loans if l.status == "active" and not l.repaid
        )
        total_paid = sum(
            l.amount for l in loans if l.status in ["repaid", "closed"]
        )

        return make_response(jsonify({
            "total_active": total_active,
            "outstanding_balance": outstanding_balance,
            "total_paid": total_paid
        }), 200)
