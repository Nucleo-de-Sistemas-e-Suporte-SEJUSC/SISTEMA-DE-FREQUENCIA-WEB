import { FormLogin } from "../../components/form-login";
import { Header } from "../../components/header";
import styles from './style.module.css'

export function Login() {
    return (
        <section className={styles["container__login"]}>
            <Header 
                cabecalhoLogin={true} 
                titulo="Gestão do RH"
            />
            <FormLogin />
        </section>
    )
}