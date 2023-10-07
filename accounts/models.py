from django.db import models
from django.contrib.auth.models import User




class CustomUser(User):
    ROLES = (('1','Test Maker'),
            ('2','Test Taker'),)
    role = models.CharField(max_length=2,choices=ROLES)
    def __str__(self):
        return self.username