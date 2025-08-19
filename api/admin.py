from django.contrib import admin
from .models import Doctor, Slot, Leave, Appointment

admin.site.register(Doctor)
admin.site.register(Slot)
admin.site.register(Leave)
admin.site.register(Appointment)
