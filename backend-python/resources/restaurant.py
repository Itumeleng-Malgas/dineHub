from flask_restful import Resource, reqparse
from models import db, Restaurant

parser = reqparse.RequestParser()
parser.add_argument('name', required=True, help="Name cannot be blank!")
parser.add_argument('location', required=True, help="Location cannot be blank!")
parser.add_argument('contact_info', required=True, help="Contact info cannot be blank!")

class RestaurantResource(Resource):
    def get(self):
        restaurants = Restaurant.query.all()
        return [{'id': restaurant.id, 'name': restaurant.name, 'location': restaurant.location, 'contact_info': restaurant.contact_info} for restaurant in restaurants]

    def post(self):
        args = parser.parse_args()
        restaurant = Restaurant(name=args['name'], location=args['location'], contact_info=args['contact_info'])
        db.session.add(restaurant)
        db.session.commit()
        return {'id': restaurant.id, 'name': restaurant.name, 'location': restaurant.location, 'contact_info': restaurant.contact_info}, 201
