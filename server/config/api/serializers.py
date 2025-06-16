from rest_framework import serializers
from api.models import Delivery, NumberModel


class DeliverySerializers(serializers.ModelSerializer):
  user = serializers.HiddenField(default=serializers.CurrentUserDefault())
  service_name = serializers.SerializerMethodField()
  number_model = serializers.SerializerMethodField()
  technical_condition = serializers.SerializerMethodField()
  stutus_delivery = serializers.SerializerMethodField()
  package = serializers.SerializerMethodField()

  class Meta:
    model = Delivery
    fields = (
      "travel_time",
      "distance",
      "mediafile",
      "technical_condition",
      "number_model",
      "stutus_delivery",
      "package",
      "service_name",
      "user"
    )

  def get_service_name(self,obj):
    return [i.name for i in obj.prefetched_services]
  
  def get_number_model(self,obj):
    print(obj.number_model)
    return str(obj.number_model)
  
  def get_package(self,obj):
    return str(obj.package)
  
  def get_technical_condition(self,obj):
    return str(obj.technical_condition)
  
  def get_stutus_delivery(self,obj):
    return str(obj.stutus_delivery)
  



class NameSerializers(serializers.Serializer):
  name = serializers.CharField()


class NumberModelSerializer(serializers.ModelSerializer):
  model_name = serializers.SerializerMethodField()
  class Meta:
    model = NumberModel
    fields = (
      'name',
      'model_name'
    )

  def get_model_name(self, obj):
    return str(obj.name_model)