from datetime import datetime

from config import bcrypt, db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

# user model


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-orders", "-items")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, default="customer", nullable=False)
    f_name = db.Column(db.String, nullable=False)
    l_name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    orders = db.relationship("Order", back_populates="user")
    items = association_proxy("orders", "items")

    def __repr__(self):
        return f"<< USER: {self.l_name}, {self.f_name} ({self.role}) >>"

    @hybrid_property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, password):
        password = bcrypt.generate_password_hash(password)
        self._password_hash = password.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)


# item model


class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String, nullable=False)
    origin = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String, nullable=False)
    pkg_qty = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=False)
    order_items = db.relationship("OrderItem", back_populates="item", cascade="all")
    orders = association_proxy(
        "order_items", "order", creator=lambda o: OrderItem(order=o)
    )

    def __repr__(self):
        return f"<< ITEM: {self.name} (${self.price / 100} / {self.unit}) >>"


# order model


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)
    city = db.Column(db.String)
    province_cd = db.Column(db.String)
    postal_cd = db.Column(db.String)
    total = db.Column(db.Integer, nullable=False, default=0)
    order_ts = db.Column(db.DateTime, nullable=False, default=datetime.now)
    status_ts = db.Column(
        db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now
    )
    status = db.Column(db.String, nullable=False, default="open")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="orders", cascade="all")
    order_items = db.relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )
    items = association_proxy(
        "order_items", "item", creator=lambda i: OrderItem(item=i)
    )

    def __repr__(self):
        return f"<< ORDER: {self.order_ts} (${self.total / 100}) >>"


# orderitem model


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    serialize_rules = ("-item", "-order")

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    price = db.Column(db.Integer, nullable=False, default=0)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    item = db.relationship("Item", back_populates="order_items")
    order = db.relationship("Order", back_populates="order_items")

    # TODO: add validation

    def __repr__(self):
        return f"<< ORDER_ITEM: {self.quantity} @ ${self.price / 100}) >>"


if __name__ == "__main__":
    user = User(
        id=1,
        username="someUsername",
        role="customer",
        f_name="John",
        l_name="Doe",
        phone="5195551212",
        password_hash="Thi$isMypa$$w0rd",
    )
    print(f"{user}\n")
    print(
        f"{user.id}\n{user.role}\n{user.username}\n{user.f_name}\n{user.l_name}\n{user.phone}\n{user.password_hash}\n"
    )

    item = Item(
        id=1,
        name="Red Bell Pepper",
        category="produce",
        origin="canada",
        price=359,
        unit="kg",
        pkg_qty="",
        image_url="http://www.grocery.com/red_bell_pepper.jpg",
    )
    print(f"{item}\n")
    print(
        f"{item.id}\n{item.name}\n{item.category}\n{item.origin}\n{item.price}\n{item.unit}\n{item.image_url}\n"
    )

    order = Order(
        id=1,
        order_ts=datetime.now(),
        address="123 Somerset Dr.",
        city="Pleasantville",
        province_cd="ON",
        postal_cd="M5S3G4",
        total=25946,
        user_id=1,
    )
    print(f"{order}\n")
    print(
        f"{order.id}\n{order.order_ts}\n{order.address}\n{order.city}\n{order.province_cd}\n{order.postal_cd}\n{order.total}\n{order.user_id}\n"
    )

    order_item = OrderItem(id=1, quantity=2, price=319, order_id=1, item_id=1)
    print(f"{order_item}\n")
    print(
        f"{order_item.id}\n{order_item.quantity}\n{order_item.price}\n{order_item.order_id}\n{order_item.item_id}\n"
    )
