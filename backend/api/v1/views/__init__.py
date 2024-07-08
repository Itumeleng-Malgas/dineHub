from flask import Blueprint
app_views = Blueprint("app_views", __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.restaurant import *
from api.v1.views.registered_client import *
from api.v1.views.authentication import *
from api.v1.views.review import *
from api.v1.views.favorite import *
from api.v1.views.menu import *
from api.v1.views.image import *
from api.v1.views.gallery import *
from api.v1.views.product import *

