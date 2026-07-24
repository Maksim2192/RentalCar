import { api } from "./api";
import type { Car } from "@/src/types/car";

export type CarsResponse = {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
};

export type CarsParams = {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: number;
};


export async function getCars(
  params?: CarsParams
): Promise<CarsResponse> {

  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      ...params,
      perPage: 12,
    },
  });

  return data;
}


export async function getCarById(
  id: string
): Promise<Car | undefined> {

  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      perPage: 12,
    },
  });

  return data.cars.find((car) => car.id === id);
}


export async function getBrands() {

  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      perPage: 12,
    },
  });


  const brands = data.cars.map(
    (car) => car.brand
  );


  return [...new Set(brands)];
}

export async function getPriceRange() {

  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      perPage: 12,
    },
  });


  const prices = data.cars.map(
    (car) => Number(car.rentalPrice)
  );


  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}