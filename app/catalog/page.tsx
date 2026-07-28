import {
  getCars,
  getBrands,
  getPriceRange,
} from "@/lib/cars";

import styles from "./page.module.css";

import CarList from "@/components/CarList/CarList";
import Filter from "@/components/Filter/Filter";

type Props = {
  searchParams: Promise<{
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};


export default async function CatalogPage({
  searchParams,
}: Props) {


  const params = await searchParams;


  const data = await getCars({
    brand: params.brand,
    price: params.price,
    minMileage: params.minMileage,
    maxMileage: params.maxMileage,
    page: 1,
  });


  const brands = await getBrands();

  const price = await getPriceRange();



  return (
    <div className={styles.container}>


      <Filter
        brands={brands}
        price={price}
        selectedBrand={params.brand}
        selectedPrice={params.price}
        selectedMinMileage={
          params.minMileage
        }
        selectedMaxMileage={
          params.maxMileage
        }
      />

      <CarList
        initialCars={
          data.cars
            .filter(Boolean)
            .filter(
              (car, index, self) =>
                index === self.findIndex(
                  (item) => item.id === car.id
                )
            )
        }
        totalPages={data.totalPages}
        currentPage={data.page}
      />


    </div>
  );
}