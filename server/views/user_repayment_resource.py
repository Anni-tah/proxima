from flask import jsonify, make_response
from flask_restful import Resource
from models import Repayment, Loan, Group

class UserRepaymentHistory(Resource):
    def get(self, user_id):
        repayments = Repayment.query.filter_by(user_id=user_id).all()

        if not repayments:
            return make_response(jsonify([]), 200)

        history = []
        for repayment in repayments:
            loan = Loan.query.get(repayment.loan_id)
            group = Group.query.get(loan.group_id) if loan else None

            history.append({
                "repayment_id": repayment.id,
                "repayment_amount": repayment.amount,
                "repayment_date": repayment.date.strftime("%Y-%m-%d"),
                "loan_id": loan.id if loan else None,
                "loan_amount": loan.amount if loan else None,
                "loan_status": loan.status if loan else None,
                "group_id": group.id if group else None,
                "group_name": group.name if group else None
            })

        return make_response(jsonify(history), 200)
