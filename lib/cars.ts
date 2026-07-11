import { Car } from "@/src/types/car";
import { api } from "./api";


type CarsResponse = {
    cars: Car[];
    totalCars: number;
};

export async function getCars(): Promise<CarsResponse> {
    const { data } = await api.get<CarsResponse>('/cars');
    return data;
}

export async function getCarById(id: string): Promise<Car | undefined> {
  const { data } = await api.get<CarsResponse>("/cars");
  return data.cars.find((car: Car) => car.id === id);
}
