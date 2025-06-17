from flask import Flask, make_response
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from werkzeug.exceptions import NotFound
from flask_cors import CORS


from views.user_view import UserResource, UserByID
from views.group_view import GroupResource, GroupByID
from views.group_member_view import GroupMemberResource, GrpMemberByID
from views.loans_view import LoanResource, LoanByID
from views.repayment_view import RepaymentResource, RepaymentByID
from views.transaction_view import TransactionResource, TransactionById
from views.savings_view import SavingsResource, SavingsById
from views.userLoginResorce import UserLoginResource
from views.group_saving_view import GroupSavingsResource
from views.user_groups_view import UserGroups
from views.user_loan_resource import UserLoansResource
from views.loans_stats_resource import UserLoanStats
from views.user_repayment_resource import UserRepaymentHistory


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
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
api.add_resource(UserLoginResource, "/login")
api.add_resource(GroupSavingsResource, '/group-savings-summary')
api.add_resource(UserGroups, '/user-groups/<int:user_id>')
api.add_resource(UserLoansResource, "/user-loans/<int:user_id>")
api.add_resource(UserLoanStats, '/user-loan-summary/<int:user_id>')
api.add_resource(UserRepaymentHistory, "/user-repayment-history/<int:user_id>")

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

