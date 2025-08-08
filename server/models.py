from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# user model

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    user_type = db.Column(db.String)
    f_name = db.Column(db.String, nullable=False)
    l_name = db.Column(db.String, nullable=False)
    phone_num = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    
    #TODO: add relationships
    #TODO: add assoc. proxies
    #TODO: add validation
    
    def __repr__(self):
        return f"<< USER: {self.username} ({self.user_type}) >>"
    
# item model

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String, nullable=False)
    origin = db.Column(db.String, nullable=False)
    unit_price = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    
    #TODO: add relationships
    #TODO: add assoc. proxies
    #TODO: add validation
    
    def __repr__(self):
        return f"<< ITEM: {self.name} (${self.unit_price/100} / {self.unit}) >>"

if __name__ == "__main__":
    dave = User(id=1, username="banwelld", user_type="customer", f_name="Dave", l_name="Banwell", phone_num="5195668231", password_hash="Thi$isMypa$$w0rd")
    print(f"{dave}\n")
    print(f"{dave.id}\n{dave.user_type}\n{dave.username}\n{dave.f_name}\n{dave.l_name}\n{dave.phone_num}\n{dave.password_hash}\n")
    
    pepper = Item(id=1, name="Red Bell Pepper", category="produce", origin="canada", unit_price=359, unit="kg", image_url="http://www.grocery.com/red_bell_pepper.jpg")
    print(f"{pepper}\n")
    print(f"{pepper.id}\n{pepper.name}\n{pepper.category}\n{pepper.origin}\n{pepper.unit_price}\n{pepper.unit}\n{pepper.image_url}")