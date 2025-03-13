
import { Header } from "../../components/comuns/header";
import { FormLogin } from "../../components/formularios/form-login";
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