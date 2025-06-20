from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_serializer import SerializerMixin
from . import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = (
        '-memberships.user', '-loans.user', '-repayments.user',
        '-transactions.user', '-savings.user', '-password_hash',
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), unique=True)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    memberships = db.relationship('GroupMember', back_populates='user', cascade='all, delete-orphan')
    loans = db.relationship('Loan', back_populates='user')
    repayments = db.relationship('Repayment', back_populates='user', cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='user', cascade="all, delete-orphan")
    savings = db.relationship('Savings', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.name}, phone {self.phone_number}, email {self.email} created successfully>'

    @property
    def password(self):
        raise AttributeError("Password is write-only.")

    @password.setter
    def password(self, plaintext_password):
        self.password_hash = generate_password_hash(plaintext_password)

    def check_password(self, plaintext_password):
        return check_password_hash(self.password_hash, plaintext_password)
