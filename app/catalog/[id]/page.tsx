import { getCarById } from "@/lib/cars";
import Image from "next/image";
import style from "./page.module.css";

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await getCarById(id);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.widthcontainer}>
        <Image
          className={style.image}
          src={car.img}
          alt={car.brand}
          width="640"
          height="512"
        />

        <div className={style.descriptioncar}>
          <div className={style.description}>
            <p className={style.model}>
              {car.brand} {car.model}
            </p>
            <p className={style.model}>
              {" "}
              <span>, </span>
              {car.year}
            </p>
            <p className={style.article}>Article: {car.stockNumber}</p>
          </div>
          <div className={style.location}>
            <svg className={style.svglocation}>
              <use href="/icons.svg#location"></use>
            </svg>
            <p>{car.location.city}</p>
            <p>
              {" "}
              <span>, </span>
              {car.location.country}
            </p>
          </div>
          <p className={style.price}>{car.rentalPrice} $</p>
          <p className={style.description}>{car.description}</p>
          <div>
            <p className={style.rental}>Rental Conditions: </p>

            <ul className={style.condition}>
              {car.rentalConditions.map((condition) => (
                <li key={condition}>
                  <svg width={16} height={16}>
                    <use href="/icons.svg#checkmark"></use>
                  </svg>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.divider}></div>
          <div>
            <p className={style.specifications}>Car Specifications:</p>
            <ul className={style.specificationsul}>
              <li>
                <svg className={style.checksvg} width={16} height={16}>
                  <use href="/icons.svg#year"></use>
                </svg>
                Year: {car.year}
              </li>
              <li>
                <svg className={style.checksvg} width={16} height={16}>
                  <use href="/icons.svg#type"></use>
                </svg>
                Type: {car.type}
              </li>
              <li>
                <svg className={style.checksvg} width={16} height={16}>
                  <use href="/icons.svg#fuel"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <svg className={style.checksvg} width={16} height={16}>
                  <use href="/icons.svg#engine"></use>
                </svg>
                Engine: {car.engine}
              </li>
              <li>
                <svg className={style.checksvg} width={16} height={16}>
                  <use href="/icons.svg#mileage"></use>
                </svg>
                Mileage: {car.mileage}
              </li>
            </ul>
          </div>
          <div className={style.divider}></div>
          <div>
            <p className={style.features}>Features</p>
            <ul className={style.featuresul}>
              {car.features.map((features) => (
                <li key={features}>
                  <svg className={style.checksvg} width={16} height={16}>
                    <use href="/icons.svg#checkmark"></use>
                  </svg>
                  <span>{features}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
