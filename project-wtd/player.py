from google.appengine.ext import ndb
    # https://cloud.google.com/appengine/docs/python/ndb/

class Player(ndb.Model):
  email = ndb.StringProperty(required=True)
  score = ndb.StringProperty(required=True)
 
