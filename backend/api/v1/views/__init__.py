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
from api.v1.views.table import *
from api.v1.views.reservation import *
from api.v1.views.normal_client import *
from api.v1.views.admin import *
from api.v1.views.order import *
from api.v1.views.payment import *
from api.v1.views.order_product import *
from api.v1.views.booking import *



