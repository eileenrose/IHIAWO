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
        user = users.get_current_user()
        if user:
            template = jinja_environment.get_template('startpage.html')
            self.response.out.write(template.render())
            query = Player.query().order(Player.score)
            player_list = query.fetch()
            for p in player_list:
                self.response.write('<br><p style="font-size:28px;font-family:verdana;border-style: outset;border-color: purple;border-width: 10px;background-color: yellow;padding: 10px;margin: 20px;">%s: %s</p>' % (p.email, p.score))
                p.put()
        else:
            template = jinja_environment.get_template('startpagenon.html')
            self.response.out.write(template.render())

class GameHandler(webapp2.RequestHandler):
    def get(self):
        templategame = jinja_environment.get_template('level1.html')
        self.response.out.write(templategame.render())

class SignInHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.redirect(users.create_logout_url('/'))
        else:
            self.redirect(users.create_login_url('/'))

class InstructionHandler(webapp2.RequestHandler):
    def get(self):
        templateinstructions = jinja_environment.get_template('instructions.html')
        self.response.out.write(templateinstructions.render())
class EndOfLevelHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            email = users.get_current_user().nickname()
            score = self.request.get('currentScore')
            player = Player(email=email, score=score)
            player.put()
            templateover = jinja_environment.get_template('end_of_level.html')
            self.response.out.write('<h1 style="font-size:48px;">Your score: %s</h1>' % score)
            self.response.out.write(templateover.render())
        else:
            score = self.request.get('currentScore')
            templateover = jinja_environment.get_template('end_of_level.html')
            self.response.out.write('<h1 style ="font-size:48px;">Your score: %s</h1>' % score)
            self.response.out.write(templateover.render())

class GameOverHandler(webapp2.RequestHandler):
    def get(self):
            score = self.request.get('currentScore')
            templateover = jinja_environment.get_template('gameOver.html')
            self.response.out.write('<h1 style ="font-size:48px;">Your score: %s</h1>' % score)
            self.response.out.write(templateover.render())




app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', GameHandler),
    ('/sign', SignInHandler),
    ('/instructions', InstructionHandler),
    ('/end_of_level', EndOfLevelHandler),
    ('/gameOver', GameOverHandler),
], debug=True)
