from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Doctor, Slot, Appointment
from .serializers import (
    UserSerializer, DoctorSerializer, SlotSerializer, AppointmentSerializer
)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all().order_by('name')
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]

class SlotListView(generics.ListAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(created_by=self.request.user).select_related('doctor', 'slot')

    # Only list and create are needed by spec, but ModelViewSet gives others; you can restrict if desired:
    http_method_names = ['get', 'post']
