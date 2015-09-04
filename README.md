# meteofisagh
Presents weather data.

## Instalation
This is web app and finally would be available as a website.
During development, I test it on localhost. Below there I write how to configure it. We will use virtual host, nginx and uwsgi

Actually, you'll need to follow steps mentioned on (http://www.markjberger.com/flask-with-virtualenv-uwsgi-nginx/).
I replaced 'mysite' with 'meteofisagh'.

### Cope with problems
The only other things you may need to do is to edit your `/etc/hosts` for example by
```
sudo vi /etc/hosts
```
and add lines like this:
```
0.0.0.0         meteofisagh.com
0.0.0.0         www.meteofisagh.com
```

If you have ever configured another servers on your computer e.g. apache, you may need to stop them as follows:
`sudo service apache stop`

### Catalogs structure
I have like this:
```
/var/www/meteofisagh/.env
```
and in .env I have the files you can find in this repo as well as some other automatically created.
