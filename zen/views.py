# -*- coding:utf-8 -*-
from django.db.models import Q

from django.shortcuts import render
from django.http import HttpResponse
from zen.models import Male
from zen.models import Female
from zen.models import Xiaozu
from django.db import connection
import re

import logging
logger = logging.getLogger('django')

def xiaozu(request):
    return render(request, 'xiaozu.html')

def xiaozued(request):
    dic = request.GET.dict()
    ret = Xiaozu.objects.filter(name=dic['name'], phone_num=dic['phone_num'])
    if not ret:
        person = Xiaozu(**dic)
        person.save()
        return render(request, 'xiaozu_bye.html')

    ret = Xiaozu.objects.filter(name=dic['name'], phone_num=dic['phone_num']).update(**dic)

    return render(request, 'xiaozu_bye.html')


def main(request):
    logger.info(request.META.get('REMOTE_ADDR'))
    return render(request, 'main.html')
def zen(request):
    return render(request, 'zen.html')

def zened(request):
    table = ""
    obj = ""
    dic = request.GET.dict()
    for key in dic.keys():
        if(key=="province"):
            dic['province']=dic['province'].split(',')[1]
        if(key=="city"):
            dic['city']=dic['city'].split(',')[1]
        if(key=="district"):
            dic['district']=dic['district'].split(',')[1]
        if(key=='birthday'):
            str=dic['birthday']
            dic['birthday']=str[0:4]+'-'+str[4:6]+'-'+str[6:]
    print(dic.values())
    dic['comes'] = 1 # comes from mobile phone

    if dic['gender'] == u'男':
        obj = Male
        table = "zen_male"
    else:
        obj = Female
        table = "zen_female"

    dic['notes'] = request.META.get('REMOTE_ADDR')
    logger.info(dic['notes'])
    ret = obj.objects.filter(name=dic['name'], phone_num=dic['phone_num'])
    if not ret:
        logger.info("{0} 没有交费或者手机号、姓名和交费时填写不一致，请联系管理人员".format(dic['name'].encode('utf8')))
        return render(request, 'error.html')

    rt = obj.objects.filter(name=dic['name'], phone_num=dic['phone_num']).update(**dic)
    if not rt:
        logger.error("{0} 错误".format(dic['name'].encode('utf8')))
        return HttpResponse("error")

    logger.info(dic)

    return render(request, 'bye.html')
