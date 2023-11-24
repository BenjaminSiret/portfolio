import Image from 'next/image'
import styles from './menu.module.css'

export default function Menu () {
  return (
    <div className={styles.container}>
      <Image src="/burger-icon.png" alt="burger icon" width="50" height="50" className={styles.burger} />
    </div>
  )
}
