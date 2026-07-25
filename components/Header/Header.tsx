"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";


export default function Header() {
    const pathname = usePathname();
    return (
        <section className={styles.section}>
            <Link className={styles.logo} title="logo" href="/">
                <svg className={styles.logoicons}>
                    <use href="/icons.svg#logo"></use>
                </svg>
            </Link>
            <ul className={styles.catalog}>
                <li className={styles.liHome}>
                    <Link className={
                        pathname === "/"
                            ? styles.active
                            : styles.link
                    } title="Home" href="/">Home</Link>
                </li>
                <li className={styles.licatalog}>
                    <Link className={
                        pathname.startsWith("/catalog")
                            ? styles.active
                            : styles.link
                    } title="Catalog" href="/catalog">Catalog</Link>
                </li>
            </ul>
        </section>
    );
}