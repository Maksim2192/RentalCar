import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
      <Link className={styles.catalog} href="/catalog">View Catalog</Link>
    </section>
  );
}
