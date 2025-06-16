from sqlalchemy_serializer import SerializerMixin
from . import db

class Savings(db.Model, SerializerMixin):
    __tablename__ = 'savings'
    serialize_rules = ('-group', '-user') 

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, server_default=db.func.now())
    is_dividend_eligible = db.Column(db.Boolean, default=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='savings')
    group = db.relationship('Group', back_populates='savings')

    def __repr__(self):
        return f"<Savings {self.amount} by User {self.user_id} in Group {self.group_id}>"
