import { getCars } from "@/lib/cars";
import styles from "./page.module.css";
import CarList from "@/components/CarList/CarList";

export default async function CatalogPage() {
  const data = await getCars();

  return (
    <div className={styles.container}>
      <CarList cars={data.cars} />
        </div>
  );
}  
