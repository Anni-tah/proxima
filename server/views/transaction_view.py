from flask import jsonify, make_response, request
from flask_restful import Api, Resource
from models import Transaction, db
from datetime import datetime

class TransactionResource(Resource):
    def get(self):
        transactions = [transaction.to_dict() for transaction in Transaction.query.all()]
        return make_response(jsonify(transactions), 200)

    def post(self):
        data = request.get_json()

        if 'type' not in data:
            return make_response({"error": "type is required"}, 400)
        if not data.get('amount') or not data.get('user_id'):
            return make_response({"error": "amount and user_id are required"}, 400)

        timestamp = None
        if 'time' in data:
            timestamp = datetime.fromisoformat(data['time'])

        new_transaction = Transaction(
            amount=data['amount'],
            type=data['type'],  
            timestamp=timestamp,
            description=data.get('description'),
            user_id=data['user_id'],
            group_id=data.get('group_id')
        )

        db.session.add(new_transaction)
        db.session.commit()

        return make_response(new_transaction.to_dict(), 201)


class TransactionById(Resource):
    def get(self, id):
        transaction = Transaction.query.filter_by(id=id).first()
        if not transaction:
            return make_response({"error": "transaction not found"}, 404)
        return make_response(jsonify(transaction.to_dict()), 200)

    def patch(self, id):
        transaction = Transaction.query.filter(Transaction.id == id).first()
        if not transaction:
            return make_response({"error": "transaction not found"}, 404)

        data = request.get_json()

        for attr in data:
            if hasattr(transaction, attr):
                if attr == 'timestamp':
                    transaction.timestamp = datetime.fromisoformat(data[attr])
                else:
                    setattr(transaction, attr, data[attr])

        db.session.commit()
        return make_response(transaction.to_dict(), 200)

    def delete(self, id):
        transaction = Transaction.query.get(id)
        if not transaction:
            return make_response({"error": "transaction not found"}, 404)

        db.session.delete(transaction)
        db.session.commit()

        return make_response('', 204)
