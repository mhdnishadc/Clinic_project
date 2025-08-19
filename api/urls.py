from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ProfileView, DoctorViewSet, SlotListView, AppointmentViewSet

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'doctors', DoctorViewSet, basename='doctor')

urlpatterns = [
    # Auth
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile (protected)
    path('profile/', ProfileView.as_view(), name='profile'),

    # Public lists
    path('slots/', SlotListView.as_view(), name='slot_list'),

    # Appointments (protected via router)
    path('', include(router.urls)),
]