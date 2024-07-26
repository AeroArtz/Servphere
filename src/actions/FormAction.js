"use server";

export async function FormAction(state, formData) {
  const originCity = formData.get("origin_city");
  const originCountryCode = formData.get("origin_country_code");
  const originUNLOcationCode = formData.get("origin_location_code");
  const originUNRegionCode = formData.get("origin_region_code");

  const destinationCity = formData.get("destination_city");
  const destinationCountryCode = formData.get("destination_country_code");
  const destinationUNLocationCode = formData.get("destination_location_code");
  const destinationUNRegionCode = formData.get("destination_region_code");

  const date = formData.get("date");

  const url = `https://api.maersk.com/products/ocean-products?collectionOriginCountryCode=US&collectionOriginCityName=Houston&collectionOriginUNLocationCode=USHOU&collectionOriginUNRegionCode=TX&deliveryDestinationCountryCode=NL&deliveryDestinationCityName=Rotterdam&deliveryDestinationUNLocationCode=NLRTM&deliveryDestinationUNRegionCode=ZH&vesselOperatorCarrierCode=MAEU&cargoType=DRY&ISOEquipmentCode=42G1&stuffingWeight=18000&weightMeasurementUnit=KGS&stuffingVolume=10&volumeMeasurementUnit=MTQ&exportServiceMode=CY&importServiceMode=CY&startDateType=D&dateRange=P4W`;
  const url1 = `https://api.maersk.com/products/ocean-products?collectionOriginCountryCode=${originCountryCode}&collectionOriginCityName=${originCity}&collectionOriginUNLocationCode=${originUNLOcationCode}&collectionOriginUNRegionCode=${originUNRegionCode}&deliveryDestinationCountryCode=${destinationCountryCode}&deliveryDestinationCityName=${destinationCity}&deliveryDestinationUNLocationCode=${destinationUNLocationCode}&deliveryDestinationUNRegionCode=${destinationUNRegionCode}&vesselOperatorCarrierCode=MAEU&cargoType=DRY&ISOEquipmentCode=42G1&stuffingWeight=18000&weightMeasurementUnit=KGS&stuffingVolume=10&volumeMeasurementUnit=MTQ&exportServiceMode=CY&importServiceMode=CY&startDateType=D&dateRange=P4W`;

  // console.log(url1==url);

  const request = await fetch(url1, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Consumer-Key": "DanBZnOt47a8oVD38JO58rqGdBrYoHef",
    },
  });
  const res = await request.json();

  return {
    data: res,
  };
}
