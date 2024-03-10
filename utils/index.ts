import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {

  
  const {manufacturer, year, fuel, limit, model} = filters
  const headers = {
    "X-RapidAPI-Key": "9cf87f42camsh6cb9184a0f2c401p1d8e10jsn2027d43e78eb",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  // "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=audi"
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${model}&year=${year}&model=${manufacturer}&limit=${limit}&fuel_type=${fuel}`
    ,
    {
      headers: headers,
    }
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const milleageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * milleageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageFactor;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?:string) =>{
  const url = new URL('https://cdn.imagin.studio/getimage');
  const {make, year, model} = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname;
}