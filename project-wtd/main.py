#!/usr/bin/env python
#

from google.appengine.api import users
import webapp2
import jinja2
import os


template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            greeting = ('Welcome, %s! Click "play" to begin the game (<a href="%s">sign out</a>)' %
                    (user.nickname(), users.create_logout_url('/')))
        else:
            greeting = ('<a href="%s">Sign in to be registered on the leaderboard</a>.' %
                        users.create_login_url('/'))

        self.response.out.write('<html><body>%s</body></html>' % greeting)
        template = jinja_environment.get_template('startpage.html')
        self.response.out.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
