"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard/CarCard";
import type { Car } from "@/src/types/car";
import style from "./CarList.module.css";

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  const [visibleCount, setVisibleCount] = useState(8);

  const visibleCars = cars.slice(0, visibleCount);

  function loadMore() {
    setVisibleCount((prev) => prev + 8);
  }

  return (
    <div className={style.bloc}>
      <div className={style.content}>
        {visibleCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {visibleCount < cars.length && (
        <button className={style.button} onClick={loadMore}>
          <span className={style.textbutton}>Load more</span>
        </button>
      )}
    </div>
  );
}
