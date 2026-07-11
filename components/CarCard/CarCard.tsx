import type { Car } from "@/src/types/car";
import styles from "./CarCard.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={car.img}
        alt={car.brand}
        width={300}
        height={200}
      />

      <div className={styles.content}>
        <div className={styles.titlep}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>{" "}
            {car.year}
          </h3>
          <p className={styles.price}>{car.rentalPrice} $</p>
        </div>
        <div className={styles.location}>
          <p>{car.location.city}</p>
          <svg className={styles.lines}>
            <use href="/icons.svg#line"></use>
          </svg>
          <p>{car.location.country}</p>
          <svg className={styles.lines}>
            <use href="/icons.svg#line"></use>
          </svg>
          <p>{car.rentalCompany}</p>
          <svg className={styles.lines}>
            <use href="/icons.svg#line"></use>
          </svg>
          <p>{car.type}</p>
          <svg className={styles.lines}>
            <use href="/icons.svg#line"></use>
          </svg>
          <p>{car.mileage}km</p>
        </div>

        <Link href={`/catalog/${car.id}`}>
          <button className={styles.button}>Read more</button>
        </Link>
      </div>
    </div>
  );
}
