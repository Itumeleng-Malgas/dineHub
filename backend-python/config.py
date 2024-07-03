#!/usr/bin/env python3


import cloudinary

class Config:
    DEBUG = True
    MONGO_URI = 'mongodb://localhost:27017/dinehub'




# Configure Cloudinary with your credentials
cloudinary.config(
  cloud_name = 'dr62gpvwd',
  api_key = '144624877847817',
  api_secret = 'XvinI7168Mslrl1qS46JplDe5qk'
)


