from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta

from .models import Doctor, Slot, Leave, Appointment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'speciality', 'department')

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ('id', 'start_time', 'end_time')

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = ('id', 'patient_name', 'age', 'appointment_date', 'slot', 'doctor')


    def validate(self, attrs):
        appointment_date = attrs.get('appointment_date')
        doctor = attrs.get('doctor')
        slot = attrs.get('slot')

        today = timezone.localdate()
        min_date = today + timedelta(days=1)  # tomorrow
        max_date = today + timedelta(days=30) # 1 month window (approx. 30 days)

        # 1) no past & not same day
        if appointment_date <= today:
            raise serializers.ValidationError({
                'appointment_date': f"Appointment cannot be booked for today or past dates. Choose a date from {min_date} to {max_date}."
            })

        # 2) within +30 days
        if appointment_date > max_date:
            raise serializers.ValidationError({
                'appointment_date': f"Appointment can be booked only up to 1 month in advance (until {max_date})."
            })

        # 3) not on leave
        if Leave.objects.filter(doctor=doctor, date=appointment_date, slot=slot).exists():
            raise serializers.ValidationError({
                'slot': "Doctor is on leave for this slot on the selected date."
            })

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        return Appointment.objects.create(created_by=user, **validated_data)