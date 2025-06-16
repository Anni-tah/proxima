from . import db
from sqlalchemy_serializer import SerializerMixin

class GroupMember(db.Model, SerializerMixin):
    __tablename__ = 'group_members'

    serialize_rules = ('-user.memberships', '-group.memberships')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    role = db.Column(db.String(50), default='member') 
    is_signatory = db.Column(db.Boolean, default=False)
    joined_at = db.Column(db.DateTime, server_default=db.func.now())


    #relationships
    user = db.relationship('User', back_populates='memberships')
    group = db.relationship('Group', back_populates='memberships')

    def __repr__(self):
        return f'<GroupMember User {self.user_id} in Group {self.group_id}>'
