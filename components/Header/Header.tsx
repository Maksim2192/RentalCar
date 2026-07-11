import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <section className={styles.section}>
            <Link className={styles.logo} title="logo" href="/">
            <svg className={styles.logoicons}>
              <use href="/icons.svg#logo"></use>  
            </svg>
            </Link>
            <ul className={styles.catalog}>
                <li className={styles.liHome}>
                    <Link title="Home" href="/">Home</Link>
                </li>
                <li className={styles.licatalog}>
                    <Link title="Catalog" href="/catalog">Catalog</Link>
                </li>
            </ul>
        </section>
    );
}