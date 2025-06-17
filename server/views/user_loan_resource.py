from flask import jsonify, make_response, request
from flask_restful import Resource
from models import Loan, db

class UserLoansResource(Resource):
    def get(self, user_id):
        user_loans = Loan.query.filter_by(user_id=user_id).all()

        loan_list = []
        for loan in user_loans:
            repayments = loan.repayments
            total_repaid = sum([r.amount for r in repayments])
            remaining_balance = float(loan.amount) - total_repaid

            loan_info = {
                "id": loan.id,
                "amount": float(loan.amount),
                "interest_rate": loan.interest_rate,
                "status": loan.status,
                "due_date": loan.due_date.isoformat(),
                "repaid": loan.repaid,
                "group_name": loan.group.name if loan.group else None,
                "remaining_balance": remaining_balance
            }

            loan_list.append(loan_info)

        return make_response(jsonify(loan_list), 200)
