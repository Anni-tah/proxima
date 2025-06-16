
from sqlalchemy_serializer import SerializerMixin
from . import db

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'
    serialize_rules = ('-memberships.group','-loans.group','-transactions.group','-savings.group')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    signatory_count=db.Column(db.Integer, nullable=False)
    interest_rate=db.Column(db.Float, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    creator_id=db.Column(db.Integer,db.ForeignKey('users.id'))

    #relationship
    memberships = db.relationship('GroupMember', back_populates='group', cascade='all, delete-orphan')
    loans = db.relationship('Loan', back_populates='group')
    transactions = db.relationship('Transaction', back_populates='group', cascade="all, delete-orphan")
    savings = db.relationship('Savings', back_populates='group', cascade='all, delete-orphan')




    def __repr__(self):
        return f'<Group {self.name} created on {self.created_at} by {self.creator_id}>'