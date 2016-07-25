#!/usr/bin/env python
#

from google.appengine.api import users
import webapp2
import jinja2
import os
from player import Player


template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('startpage.html')
        self.response.out.write(template.render())

class GameHandler(webapp2.RequestHandler):
    def get(self):
        templategame = jinja_environment.get_template('level1.html')
        self.response.out.write(templategame.render())

class SignInHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            greeting = ('<a href="%s">Sign out</a>' %
                    (users.create_logout_url('/')))
        else:
            greeting = ('<a href="%s">Sign in to be registered on the leaderboard</a>.' %
                        users.create_login_url('/'))

        self.response.out.write('<html><body>%s</body></html>' % greeting)

class AddScoreHandler(webapp2.RequestHandler):
    def get(self):
        name = self.request.get('name')
        user = users.get_current_user()
        score = self.request.get('score')
        player = Player(name=name, email=user.nickname(), score=score)
        player.put()
        message = '<ul><li>%s, %s</li></ul>' % (name, email)
        self.response.write(message)


class ScoreHandler(webapp2.RequestHandler):
    def get(self):
        query = Player.query().order(Player.score)
        player_list = query.fetch()
        for p in player_list:
            self.response.write('<p>%s</p>' % p.name)
            s.put()


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', GameHandler),
    ('/sign', SignInHandler),
    ('/add', AddScoreHandler),
    ('/scores', ScoreHandler),
], debug=True)
