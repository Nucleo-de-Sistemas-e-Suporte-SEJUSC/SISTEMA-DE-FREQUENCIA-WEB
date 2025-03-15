
import { FormLogin } from "../../components/formularios/form-login";
import styles from './style.module.css'

export function Login() {
    return (
        <section className={styles["container__login"]}>
            <FormLogin />
        </section>
    )
}