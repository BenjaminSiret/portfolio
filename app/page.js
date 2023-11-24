import styles from './page.module.css'
import Image from 'next/image'

export default function Home () {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image src='/photo.png' alt='Benjamin Siret' width='100' height='100' className={styles.photo} />
        <div className={styles.name}>Benjamin Siret</div>
      </div>
      <h1 className={styles.title}>Développeur Frontend</h1>
      <div className={styles.text}>
        <p>Curieux</p>
        <p>Engagé</p>
        <p>Etre toujours en progrès</p>
      </div>
    </main>
  )
}
