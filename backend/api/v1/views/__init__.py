from flask import Blueprint
app_views = Blueprint("app_views", __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.restaurant import *
from api.v1.views.registered_client import *
from api.v1.views.authentication import *