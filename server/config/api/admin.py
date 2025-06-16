from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import (
    User,
    Delivery,
    ModelTransport,
    NumberModel,
    TypePackage,
    StatusDelivery,
    Service,
)


admin.site.unregister(Group)


@admin.register(ModelTransport)
class ModelTransportModelAdmin(admin.ModelAdmin): ...


@admin.register(Service)
class ServiceModelAdmin(admin.ModelAdmin): ...


@admin.register(NumberModel)
class NumberModelModelAdmin(admin.ModelAdmin): ...


@admin.register(TypePackage)
class TypePackageModelAdmin(admin.ModelAdmin): ...


@admin.register(StatusDelivery)
class StatusDeliveryModelAdmin(admin.ModelAdmin): ...


@admin.register(Delivery)
class DeliveryModelAdmin(admin.ModelAdmin): ...


@admin.register(User)
class UserModelAdmin(UserAdmin):
    list_display = (
        "id",
        "first_name",
        "last_name",
        "username",
        "email",
        "is_staff",
        "is_superuser",
        "is_active",
        "date_joined",
    )

    readonly_fields = (
        "date_joined",
        "last_login",
    )
