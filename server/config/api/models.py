
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class User(AbstractUser):
    pass


class ModelTransport(models.Model):
    name = models.CharField(verbose_name="модель", max_length=300)

    def __str__(self):
        return self.name


class TypePackage(models.Model):
    name = models.CharField(verbose_name="тип упаковки", max_length=300)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(verbose_name="услуга", max_length=300)

    def __str__(self):
        return self.name


class StatusDelivery(models.Model):
    name = models.CharField(verbose_name="статус доставки", max_length=300)

    def __str__(self):
        return self.name


class NumberModel(models.Model):
    name_model = models.ForeignKey(to=ModelTransport, on_delete=models.CASCADE)
    name = models.CharField(verbose_name="номер", max_length=300)

    def __str__(self):
        return self.name


class Delivery(models.Model):
    number_model = models.ForeignKey(to=NumberModel, on_delete=models.CASCADE)
    travel_time = models.DurationField(verbose_name="время в пути", default=None)
    distance = models.IntegerField(verbose_name="дистанция")
    mediafile = models.FileField(verbose_name="медиа файл", upload_to="media", blank=True, null=True)
    service = models.ManyToManyField(to=Service)
    stutus_delivery = models.ForeignKey(to=StatusDelivery, on_delete=models.CASCADE)
    package = models.ForeignKey(to=TypePackage, on_delete=models.CASCADE)

    CONDITION = (("исправно", "неисправно"), ("исправно", "неисправно"))
    technical_condition = models.CharField(
        verbose_name="техническое состояние", choices=CONDITION
    )
    created_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.id}  {self.stutus_delivery} {self.created_at}"
