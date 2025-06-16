from sqlalchemy_serializer import SerializerMixin
from . import db

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'
    serialize_rules = ('-user', '-group')

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)  
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    description = db.Column(db.String, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='transactions')
    group = db.relationship('Group', back_populates='transactions')

    def __repr__(self):
        return f"<Transaction {self.type} of {self.amount} by User {self.user_id}>"
