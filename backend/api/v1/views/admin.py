#!/usr/bin/python3
"""module to handle admin"""

from api.v1.views.index import app_views
from models import storage
from models.user import User
from models.menu import Menu
from models.product import Product
from models.review import Review
from models.favorite import Favorite
from models.gallery import Gallery
from models.image import Image
from flask import Flask, jsonify, request
import jwt
import os
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

def generate_token(user_id, role):
    """Generate a JWT token"""
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def check_admin(f):
    def wrapper(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token = auth_header.split(" ")[1]
                decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                if decoded_token.get('role') != 'admin':
                    return jsonify({"error": "Unauthorized"}), 403
            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token has expired"}), 403
            except jwt.InvalidTokenError:
                return jsonify({"error": "Invalid token"}), 403
        else:
            return jsonify({"error": "Token is missing"}), 403
        
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@app.route('/login', methods=['POST'])
def login():
    auth_data = request.json
    username = auth_data.get('username')
    password = auth_data.get('password')
    
    # Actual user authentication logic
    if username == 'admin' and password == 'admin123':
        token = generate_token(user_id=1, role='admin')
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/admin', methods=['GET'])
@check_admin
def admin():
    """Route to get all users"""
    # logic to get all users
    users = storage.all(User).values()
    return jsonify([user.to_dict() for user in users])

@app.route('/admin/users', methods=['GET'])
@check_admin
def admin_users():
    """Route to get all users"""
    users = storage.all(User).values()
    return jsonify([user.to_dict() for user in users])

@app.route('/admin/menus', methods=['GET'])
@check_admin
def admin_menus():
    """Route to get all menus"""
    menus = storage.all(Menu).values()
    return jsonify([menu.to_dict() for menu in menus])

@app.route('/admin/products', methods=['GET'])
@check_admin
def admin_products():
    """Route to get all products"""
    products = storage.all(Product).values()
    return jsonify([product.to_dict() for product in products])

@app.route('/admin/reviews', methods=['GET'])
@check_admin
def admin_reviews():
    """Route to get all reviews"""
    reviews = storage.all(Review).values()
    return jsonify([review.to_dict() for review in reviews])

@app.route('/admin/favorites', methods=['GET'])
@check_admin
def admin_favorites():
    """Route to get all favorites"""
    favorites = storage.all(Favorite).values()
    return jsonify([favorite.to_dict() for favorite in favorites])

@app.route('/admin/galleries', methods=['GET'])
@check_admin
def admin_galleries():
    """Route to get all galleries"""
    galleries = storage.all(Gallery).values()
    return jsonify([gallery.to_dict() for gallery in galleries])

@app.route('/admin/images', methods=['GET'])
@check_admin
def admin_images():
    """Route to get all images"""
    images = storage.all(Image).values()
    return jsonify([image.to_dict() for image in images])

if __name__ == '__main__':
    app.run(debug=True)
