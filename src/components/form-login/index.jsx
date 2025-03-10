import "./form-login.css"
import {Input} from "./input"

export function FormLogin() {
    return (
        <section className="container__form">
            <h2 className="container__form__titulo">Login</h2>

            <section className="container__section__form">
                <form action="#" className="form">
                    <Input for="usuario" label="Usuário" />
                    <Input for="senha" label="Senha" />
                    <div className="container__button">
                        <button type="submit" className="form__button">Entrar</button>
                    </div>
                </form>
            </section>
        </section>
    )
}