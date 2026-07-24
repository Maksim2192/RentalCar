"use client";

import { useEffect, useState } from "react";
import { Car } from "@/src/types/car";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import NotFound from "../NotFound/NotFound";

type Props = {
  initialCars: Car[];
  totalPages: number;
  currentPage: number;
};

export default function CarList({
  initialCars,
  totalPages,
  currentPage,
}: Props) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCars(initialCars);
    setPage(currentPage);
  }, [initialCars, currentPage]);

  const loadMore = async () => {
    if (page >= totalPages || loading) return;

    try {
      setLoading(true);

      const nextPage = page + 1;

      const params = new URLSearchParams(window.location.search);
      params.set("page", String(nextPage));

      const res = await fetch(`/api/cars?${params.toString()}`);
      const data = await res.json();

      setCars((prev) => {
        const uniqueCars = [
          ...prev,
          ...data.cars.filter(
            (car: Car) => !prev.some((item) => item.id === car.id)
          ),
        ];

        return uniqueCars;
      });

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bloc}>
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <span className={styles.spinner}></span>

            <h2 className={styles.loadingTitle}>
              Loading cars...
            </h2>

            <p className={styles.loadingText}>
              Please wait while we fetch the best
              <br />
              cars for you
            </p>
          </div>
        </div>
      )}

      {cars.length === 0 ? (
        <NotFound />
      ) : (
        <ul className={styles.content}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      )}

      {page < totalPages && (
        <button
          className={styles.button}
          onClick={loadMore}
          disabled={loading}
        >
          Load more
        </button>
      )}

    </div>
  );
}