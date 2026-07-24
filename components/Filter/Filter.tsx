"use client";

import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

type Props = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
  selectedBrand?: string;
  selectedPrice?: string;
  selectedMinMileage?: string;
  selectedMaxMileage?: string;
};

export default function Filter({
  brands,
  price,
  selectedBrand = "",
  selectedPrice = "",
  selectedMinMileage = "",
  selectedMaxMileage = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const [brand, setBrand] = useState(selectedBrand);
  const [selectedPriceValue, setSelectedPriceValue] =
    useState(selectedPrice);

  const [from, setFrom] = useState(selectedMinMileage);
  const [to, setTo] = useState(selectedMaxMileage);
  const [loading, setLoading] = useState(false);


  const minPrice = Math.max(price.min, 30);


  const prices = Array.from(
    {
      length:
        Math.floor((price.max - minPrice) / 10) + 1,
    },
    (_, index) => minPrice + index * 10
  );

  useEffect(() => {
  setLoading(false);
}, [searchParams]);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);


    const params = new URLSearchParams();


    if (brand) {
      params.set("brand", brand);
    }


    if (selectedPriceValue) {
      params.set("price", selectedPriceValue);
    }


    if (from) {
      params.set("minMileage", from);
    }


    if (to) {
      params.set("maxMileage", to);
    }


    router.push(
      `/catalog?${params.toString()}`
    );
  }


  function clearFilters() {
    setBrand("");
    setSelectedPriceValue("");
    setFrom("");
    setTo("");

    router.push("/catalog");
  }


  return (

    <div className={styles.container}>
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
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.brand}>
          <label className={styles.labelcar} htmlFor="brand">Car brand</label>
          <select
            className={styles.carbrand}
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
          >
            <option value="">
              Choose a brand
            </option>

            {brands.map((brand) => (
              <option
                key={brand}
                value={brand}
              >
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.brand}>
          <label className={styles.labelcar} htmlFor="price">Price/ 1 hour</label>
          <select
            className={styles.carbrand}
            value={selectedPriceValue}
            onChange={(e) =>
              setSelectedPriceValue(e.target.value)
            }
          >
            <option value="">
              Choose a price
            </option>


            {prices.map((price) => (
              <option
                key={price}
                value={price}
              >
                {price} $
              </option>
            ))}

          </select>
        </div>

        <div className={styles.brand}>
          <label className={styles.labelcarfrom} htmlFor="mileage">Сar mileage / km</label>
          <div className={styles.input}>
            <input
              className={styles.carbrandinput}
              value={from}
              onChange={(e) =>
                setFrom(e.target.value)
              }
              placeholder="From"
            />


            <input
              className={styles.cartoinput}
              value={to}
              onChange={(e) =>
                setTo(e.target.value)
              }
              placeholder="To"
            />
            <div className={styles.divbutton}>
              <button
                className={styles.button}
                type="submit"
                disabled={loading}
              >
                Search
              </button>
              <button
                className={styles.buttonClear}
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </form>


    </div>
  );
}