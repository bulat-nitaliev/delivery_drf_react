
import dayjs from "dayjs";
import { useMemo } from "react";


export const useFilterData = (dataDelivery, filterDelivery)=>{
  const filteredData = useMemo(() => {
      return dataDelivery.filter((item) => {
        if (!item) return false;
  
        // Проверка даты
        if (
          filterDelivery.date1 &&
          !dayjs(item.created_at).isSame(dayjs(filterDelivery.date1), "day")
        ) {
          return false;
        }
  
        // Проверка услуги
        if (
          filterDelivery.service &&
          !item.services.includes(filterDelivery.service)
        ) {
          return false;
        }
  
        // Проверка типа пакета
        if (
          filterDelivery.packageName &&
          filterDelivery.packageName !== item.package__name
        ) {
          return false;
        }
  
        if (
          filterDelivery.status &&
          filterDelivery.status !== item.stutus_delivery__name
        ) {
          return false;
        }
  
        return true;
      });
    }, [dataDelivery, filterDelivery]);
    return filteredData
}