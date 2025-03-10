import "./header.css"

export function Header(props) {
    return (
        <header className={props.cabecalhoLogin ? "cabecalho__login" : "cabecalho__home"}>
            <section className="container__header">
                <h1 className="titulo">Gestão do RH</h1>
            </section>
        </header>
    )
}