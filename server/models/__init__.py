from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .group import Group
from .group_member import GroupMember
from .loans import Loan
from .repayments import Repayment
from .transactions import Transaction
from .savings import Savings