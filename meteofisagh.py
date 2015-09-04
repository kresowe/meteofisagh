from flask import Flask
from flask import render_template
import re

my_app = Flask(__name__)

if __name__ == '__main__':
    my_app.debug = True
    # my_app.run(host='0.0.0.0')
    my_app.run()

app_page_name = 'Meteo WFiIS AGH'

@my_app.route('/')
@my_app.route('/index/')
def main_page(page_name=app_page_name):
    return render_template('main.html', page_name=page_name)


@my_app.route('/about/')
def about(page_name=app_page_name):
    return render_template('about.html', page_name=page_name)


@my_app.route('/station/<station_id>/')
def station(station_id, page_name=app_page_name):
    if re.search('^s[0-9]{3}$', station_id):
        return render_template('station.html', page_name=page_name, station_id=station_id)
    else:
        return render_template('error404.html'), 404

@my_app.errorhandler(404)
def page_not_found(e):
    return render_template('error404.html'), 404
