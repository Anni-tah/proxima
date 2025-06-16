from flask import Flask, make_response
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from werkzeug.exceptions import NotFound

from views.user_view import UserResource, UserByID
from views.group_view import GroupResource, GroupByID
from views.group_member_view import GroupMemberResource, GrpMemberByID
from views.loans_view import LoanResource, LoanByID
from views.repayment_view import RepaymentResource, RepaymentByID
from views.transaction_view import TransactionResource, TransactionById
from views.savings_view import SavingsResource, SavingsById


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///proxima.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)
api.add_resource(UserResource, '/users')
api.add_resource(UserByID, '/user/<int:id>')
api.add_resource(GroupResource, '/groups')
api.add_resource(GroupByID, '/group/<int:id>')
api.add_resource(GroupMemberResource,'/groupmembers')
api.add_resource(GrpMemberByID, '/groupmember/<int:id>')
api.add_resource(LoanResource, '/loans')
api.add_resource(LoanByID, '/loan/<int:id>')
api.add_resource(RepaymentResource, '/repayments')
api.add_resource(RepaymentByID, '/repayment/<int:id>')
api.add_resource(TransactionResource, '/transactions')
api.add_resource(TransactionById, '/transaction/<int:id>')
api.add_resource(SavingsResource, '/savings')
api.add_resource(SavingsById, '/savings/<int:id>')

@app.route('/')
def index():
    return "Index for Proxima Centauri"

@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response

app.register_error_handler(404, handle_not_found)


if __name__ == '__main__':
    app.run( debug=True)

