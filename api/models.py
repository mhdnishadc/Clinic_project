from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Doctor(models.Model):
    name = models.CharField(max_length=120)
    speciality = models.CharField(max_length=120)
    department = models.CharField(max_length=120)

    def __str__(self):
        return f"{self.name} ({self.speciality})"

class Slot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return f"{self.start_time.strftime('%I:%M %p')} - {self.end_time.strftime('%I:%M %p')}"

class Leave(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='leaves')
    date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('doctor', 'date', 'slot')
        ordering = ['-date']

    def __str__(self):
        return f"{self.doctor} on leave {self.date} [{self.slot}]"

class Appointment(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    patient_name = models.CharField(max_length=120)
    age = models.PositiveIntegerField()
    appointment_date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.PROTECT)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT, related_name='appointments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-appointment_date', '-id']

    def __str__(self):
        return f"{self.patient_name} → {self.doctor} on {self.appointment_date} [{self.slot}]"
