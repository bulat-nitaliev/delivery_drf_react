export const getFilterValue = (dataDelivery) => {
  const uniqueServices = Array.from(
    new Set(dataDelivery?.map((item) => item.services.join(", ") ?? ""))
  );

  const uniquePackages = Array.from(
    new Set(dataDelivery?.map((item) => item.package__name ?? ""))
  );

  const uniqueStatuses = Array.from(
    new Set(dataDelivery?.map((item) => item.stutus_delivery__name ?? ""))
  );
  return [uniqueServices, uniquePackages, uniqueStatuses];
};


export const filterFun = (filterDelivery,filteredData, dataDelivery) => {
    return filterDelivery.date1 ||
      filterDelivery.packageName ||
      filterDelivery.service ||
      filterDelivery.status
      ? filteredData
      : dataDelivery;
  };