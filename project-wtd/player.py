from google.appengine.ext import ndb
    # https://cloud.google.com/appengine/docs/python/ndb/

class Player(ndb.Model):
  name = ndb.StringProperty(required=True)
  email = ndb.StringProperty(required=True)
  score = ndb.StringProperty(required=True)
  level = ndb.StringProperty(required=True)
