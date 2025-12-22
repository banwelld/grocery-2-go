from datetime import datetime, timezone

from config import bcrypt, db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

# user model


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-orders", "-products", "-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, default="customer", nullable=False)
    f_name = db.Column(db.String, nullable=False)
    l_name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    registration_ts = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    orders = db.relationship("Order", back_populates="user")
    products = association_proxy("orders", "products")

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


# product model


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules = ("-orders", "-order_products")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String, nullable=False)
    origin = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    sale_unit = db.Column(db.String, nullable=False)
    pkg_qty = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=False)
    order_products = db.relationship(
        "OrderProduct", back_populates="product", cascade="all"
    )

    def __repr__(self):
        return f"<< PRODUCT: {self.name} (${self.price / 100} / {self.sale_unit}) >>"


# order model


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    serialize_rules = ("-order_products.order", "-user.orders", "-user.products")

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)
    city = db.Column(db.String)
    province_cd = db.Column(db.String)
    postal_cd = db.Column(db.String)
    product_count = db.Column(db.Integer)
    total = db.Column(db.Integer)
    order_ts = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    status_ts = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    status = db.Column(db.String, nullable=False, default="open")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="orders", cascade="all")
    order_products = db.relationship(
        "OrderProduct", back_populates="order", cascade="all, delete-orphan"
    )
    products = association_proxy(
        "order_products", "product", creator=lambda i: OrderProduct(product=i)
    )

    def __repr__(self):
        return (
            f"<< ORDER: {self.status} {self.order_ts} (${(self.total or 0) / 100}) >>"
        )


# orderproduct model


class OrderProduct(db.Model, SerializerMixin):
    __tablename__ = "order_products"

    serialize_rules = ("-order",)

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Integer)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product = db.relationship("Product", back_populates="order_products")
    order = db.relationship("Order", back_populates="order_products")

    # TODO: add validation

    def __repr__(self):
        return f"<< ORDER_PRODUCT: {self.product.name} {self.quantity} @ ${self.product.price / 100} >>"


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

    product = Product(
        id=1,
        name="Red Bell Pepper",
        category="produce",
        origin="canada",
        price=359,
        sale_unit="kg",
        pkg_qty="",
        image_url="http://www.grocery.com/red_bell_pepper.jpg",
    )
    print(f"{product}\n")
    print(
        f"{product.id}\n{product.name}\n{product.category}\n{product.origin}\n{product.price}\n{product.sale_unit}\n{product.image_url}\n"
    )

    order = Order(
        id=1,
        order_ts=lambda: datetime.now(timezone.utc)(),
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

    order_product = OrderProduct(id=1, quantity=2, price=319, order_id=1, product_id=1)
    print(f"{order_product}\n")
    print(
        f"{order_product.id}\n{order_product.quantity}\n{order_product.product.price}\n{order_product.order_id}\n{order_product.product_id}\n"
    )
