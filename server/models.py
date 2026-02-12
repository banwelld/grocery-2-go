import re
from datetime import datetime, timezone

from config import bcrypt, db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

# user model


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-orders", "-products", "-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, default="customer", nullable=False)
    status = db.Column(db.String, default="active", nullable=False)
    name_first = db.Column(db.String, nullable=False)
    name_last = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    orders = db.relationship(
        "Order", back_populates="user", cascade="all, delete-orphan"
    )
    products = association_proxy("orders", "products")

    def __repr__(self):
        return f"<< USER: {self.id}, {self.name_first} ({self.role}) >>"

    @hybrid_property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, password):
        password = bcrypt.generate_password_hash(password)
        self._password_hash = password.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates("email")
    def validate_email(self, key, address):
        if not address or not re.match(r"[^@]+@[^@]+\.[^@]+", address):
            raise ValueError("Invalid email address format")
        return address

    @validates("role")
    def validate_role(self, key, role):
        if role not in ["customer", "admin"]:
            raise ValueError("Invalid user role")
        return role

    @validates("status")
    def validate_status(self, key, status):
        if status not in ["active", "inactive"]:
            raise ValueError("Invalid user status")
        return status

    @validates("name_first", "name_last")
    def validate_names(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key.replace('_', ' ')} cannot be empty")
        return value.strip()


# product model


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules = ("-orders", "-order_products")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String, nullable=False)
    origin_country = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    price_cents = db.Column(db.Integer, nullable=False)
    sale_unit = db.Column(db.String, nullable=False)
    package_quantity = db.Column(db.String, nullable=True)
    image_filename = db.Column(db.String, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    order_products = db.relationship(
        "OrderProduct", back_populates="product", cascade="all"
    )

    def __repr__(self):
        return f"<< PRODUCT: {self.id}, {self.category} (${self.price_cents / 100:.2f}) >>"

    @validates("name", "category", "origin_country", "sale_unit")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key.replace('_', ' ')} cannot be empty")
        return value.strip()

    @validates("price_cents")
    def validate_price(self, key, value):
        if value is not None and value < 0:
            raise ValueError("Price must be a non-negative integer")
        return value


# order model


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    __table_args__ = (
        db.Index(
            "one_open_order_per_user",
            "user_id",
            unique=True,
            postgresql_where=(db.column("status") == "open"),
        ),
    )

    serialize_rules = (
        "-order_products.order",
        "-user.orders",
        "-user.products",
    )

    id = db.Column(db.Integer, primary_key=True)
    address_line_1 = db.Column(db.String)
    address_line_2 = db.Column(db.String)
    city = db.Column(db.String)
    province_code = db.Column(db.String)
    postal_code = db.Column(db.String)
    product_count = db.Column(db.Integer, nullable=False, default=0)
    final_total_cents = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    status = db.Column(db.String, nullable=False, default="open")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="orders")
    order_products = db.relationship(
        "OrderProduct",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="joined",
    )
    products = association_proxy(
        "order_products", "product", creator=lambda i: OrderProduct(product=i)
    )

    def __repr__(self):
        return f"<< ORDER: {self.id}, {self.status} (${(self.final_total_cents or 0) / 100:.2f}) >>"

    @validates("status")
    def validate_status(self, key, status):
        valid_statuses = [
            "open",
            "submitted",
            "in_process",
            "fulfilled",
            "cancelled",
        ]
        if status not in valid_statuses:
            raise ValueError(f"Invalid order status: {status}")
        return status


# orderproduct model


class OrderProduct(db.Model, SerializerMixin):
    __tablename__ = "order_products"

    __table_args__ = (
        db.UniqueConstraint("order_id", "product_id", name="_order_product_uc"),
    )

    serialize_rules = ("-order",)

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price_cents = db.Column(db.Integer, nullable=False, default=0)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(
        db.Integer, db.ForeignKey("products.id"), nullable=False
    )
    product = db.relationship(
        "Product", back_populates="order_products", lazy="joined"
    )
    order = db.relationship("Order", back_populates="order_products")

    def __repr__(self):
        return f"<< ORDER_PRODUCT: {self.id}, prod: {self.product_id} ({self.quantity}) >>"

    @validates("price_cents")
    def validate_price(self, key, value):
        if value is not None and value < 0:
            raise ValueError("Price must be a non-negative integer")
        return value

    @validates("quantity")
    def validate_quantity(self, key, value):
        if value is not None and value <= 0:
            raise ValueError("Quantity must be greater than zero")
        return value


if __name__ == "__main__":
    user = User(
        id=1,
        email="john.doe@example.com",
        role="customer",
        name_first="John",
        name_last="Doe",
        phone="5195551212",
        password="Thi$isMypa$$w0rd",
    )
    print(f"{user}\n")
    print(
        f"{user.id}\n{user.role}\n{user.email}\n"
        f"{user.name_first}\n{user.name_last}\n"
        f"{user.phone}\n{user._password_hash}\n"
    )

    product = Product(
        id=1,
        name="Red Bell Pepper",
        category="produce",
        origin_country="canada",
        price_cents=359,
        sale_unit="kg",
        package_quantity="",
        image_filename="http://www.grocery.com/red_bell_pepper.jpg",
    )
    print(f"{product}\n")
    print(
        f"{product.id}\n{product.name}\n{product.category}\n"
        f"{product.origin_country}\n{product.price_cents}\n"
        f"{product.sale_unit}\n{product.image_filename}\n"
    )

    order = Order(
        id=1,
        address_line_1="123 Somerset Dr.",
        address_line_2="West Building, Unit 2B",
        city="Pleasantville",
        province_code="ON",
        postal_code="M5S3G4",
        product_count=33,
        finsl_total_cents=25946,
        user_id=1,
    )
    print(f"{order}\n")
    print(
        f"{order.id}\n{order.created_at}\n{order.address_line_1}\n"
        f"{order.address_line_2}{order.city}\n{order.province_code}\n"
        f"{order.postal_code}\n{order.total}\n{order.user_id}\n"
    )

    order_product = OrderProduct(
        id=1, quantity=2, price_cents=319, order_id=1, product_id=1
    )
    print(f"{order_product}\n")
    print(
        f"{order_product.id}\n{order_product.quantity}\n"
        f"{order_product.price_cents}\n{order_product.order_id}\n"
        f"{order_product.product_id}\n"
    )
