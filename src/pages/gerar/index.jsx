import { Header} from "../../components/header";
import { Main } from "../../components/main";
import { Navigation } from "../../components/navigation";

export function Gerar() {
    return (
        <>
            <Header cabecalhoLogin={false} />
            <Navigation />
            <Main />
        </>
    )
}