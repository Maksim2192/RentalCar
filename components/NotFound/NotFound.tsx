"use client";

import { useRouter } from "next/navigation";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const router = useRouter();

  const resetFilters = () => {
    router.push("/catalog");
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="/images/not-found.svg"
        alt="No cars found"
      />

      <h2 className={styles.title}>
        No cars found
      </h2>

      <p className={styles.text}>
        We couldn&apos;t find any cars that match your
        <br />
        current filters. Try changing your search
        <br />
        criteria or reset the filters.
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={resetFilters}
      >
        Reset filters
      </button>
    </div>
  );
}