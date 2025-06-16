
from sqlalchemy_serializer import SerializerMixin
from . import db

class Loan(db.Model, SerializerMixin):
    __tablename__ = 'loans'
    serialize_rules = ('-user','-group','-repayments.loan')

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')  
    issued_date = db.Column(db.DateTime, server_default=db.func.now())
    due_date = db.Column(db.DateTime, nullable=True)
    repaid = db.Column(db.Boolean, default=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='loans')
    group = db.relationship('Group', back_populates='loans')
    repayments = db.relationship('Repayment', back_populates='loan', cascade='all, delete-orphan')

    


    def __repr__(self):
        return f"<Loan {self.amount} by User {self.user_id} in Group {self.group_id}>"    
