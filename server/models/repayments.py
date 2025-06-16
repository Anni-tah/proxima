from sqlalchemy_serializer import SerializerMixin

from . import db

class Repayment(db.Model, SerializerMixin):
    __tablename__ = 'repayments'
    serialize_rules = ('-loan','-user')

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, server_default=db.func.now())

    loan_id = db.Column(db.Integer, db.ForeignKey('loans.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    loan = db.relationship('Loan', back_populates='repayments')
    user = db.relationship('User', back_populates='repayments')

    def __repr__(self):
        return f"<Repayment {self.amount} for Loan {self.loan_id} by User {self.user_id}>"
