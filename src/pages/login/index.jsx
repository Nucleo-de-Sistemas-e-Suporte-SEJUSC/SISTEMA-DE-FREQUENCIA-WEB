import { FormLogin } from "../../components/form-login";
import { Header } from "../../components/header";
import './login.css'

export function Login() {
    return (
        <section className="container__login">
            <Header cabecalhoLogin={true} />
            <FormLogin />
        </section>
    )
}