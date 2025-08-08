from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# user model

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    user_type = db.Column(db.String)
    f_name = db.Column(db.String)
    l_name = db.Column(db.String)
    phone_num = db.Column(db.Integer)
    password_hash = db.Column(db.String)
    
    #TODO: add relationships
    #TODO: add assoc. proxies
    #TODO: add validation
    
    def __repr__(self):
        return f"<< USER: {self.username} ({self.user_type}) >>"

if __name__ == "__main__":
    dave = User(id=1, username="banwelld", user_type="customer", f_name="Dave", l_name="Banwell", phone_num="5195668231", password_hash="Thi$isMypa$$w0rd")
    print(dave, "\n")
    print(dave.id, dave.user_type, dave.username, dave.f_name, dave.l_name, dave.phone_num, dave.password_hash)