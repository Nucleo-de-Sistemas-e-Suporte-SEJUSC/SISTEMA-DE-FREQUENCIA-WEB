import { Header } from "../../components/header";
import { MenuHome } from "../../components/menu-home";

export function Home() {
    return (
        <section className="container__login">
            <Header cabecalhoLogin={true} />
            <MenuHome />
        </section>
    )
}