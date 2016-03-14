#!/usr/bin/python2.7
"""
WSGI config for prajna project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os
import sys

sys.path.append("/Users/quqinglei/depository/web/prajna/")
sys.path.append("/Users/quqinglei/depository/web/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "prajna.settings")

lst = ['', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/distribute-0.6.28-py2.7.egg', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/MySQL_python-1.2.4b4-py2.7-macosx-10.10-x86_64.egg', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python27.zip', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages', '/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/PIL']

sys.path.extend(lst)

os.environ['PYTHON_EGG_CACHE'] = '/opt/tmp/.python-eggs'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
