from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db

# user model

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
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
        return f"<< ITEM: {self.name} (${self.unit_price / 100} / {self.unit}) >>"


# order model

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    order_ts = db.Column(db.DateTime, nullable=False, default=datetime.now)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    province_cd = db.Column(db.String, nullable=False)
    postal_cd = db.Column(db.String, nullable=False)
    order_total = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    
    #TODO: add relationships
    #TODO: add assoc. proxies
    #TODO: add validation
    
    def __repr__(self):
        return f"<< ORDER: {self.order_ts()} (${self.order_total / 100}) >>"


# orderitem model

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"
    
    # TODO: serializer rules
    
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price_paid = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    
    
    #TODO: add relationships
    #TODO: add assoc. proxies
    #TODO: add validation
    
    def __repr__(self):
        return f"<< ORDER_ITEM: {self.quantity} @ ${self.unit_price_paid / 100}) >>"


if __name__ == "__main__":
    user = User(id=1, username="someUsername", user_type="customer", f_name="John", l_name="Doe", phone_num="5195551212", password_hash="Thi$isMypa$$w0rd")
    print(f"{user}\n")
    print(f"{user.id}\n{user.user_type}\n{user.username}\n{user.f_name}\n{user.l_name}\n{user.phone_num}\n{user.password_hash}\n")
    
    item = Item(id=1, name="Red Bell Pepper", category="produce", origin="canada", unit_price=359, unit="kg", image_url="http://www.grocery.com/red_bell_pepper.jpg")
    print(f"{item}\n")
    print(f"{item.id}\n{item.name}\n{item.category}\n{item.origin}\n{item.unit_price}\n{item.unit}\n{item.image_url}\n")
    
    order = Order(id=1, order_ts=datetime.now, address="123 Somerset Dr.", city="Pleasantville", province_cd="ON", postal_cd="M5S3G4", order_total=25946, user_id=1)
    print(f"{order}\n")
    print(f"{order.id}\n{order.order_ts()}\n{order.address}\n{order.city}\n{order.province_cd}\n{order.postal_cd}\n{order.order_total}\n{order.user_id}\n")
    
    order_item = OrderItem(id=1, quantity=2, unit_price_paid=319, order_id=1, item_id=1)
    print(f"{order_item}\n")
    print(f"{order_item.id}\n{order_item.quantity}\n{order_item.unit_price_paid}\n{order_item.order_id}\n{order_item.item_id}\n")