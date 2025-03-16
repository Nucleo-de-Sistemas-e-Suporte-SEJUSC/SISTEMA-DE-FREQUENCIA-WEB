import "./style.css";

export function Navigation({ children }) {

    return (
        <section className={"container__navigation"}>
            <nav className={"navigation"}>
                <div className={"navigation__list"}>
                    { children }
                </div>
            </nav>
        </section>
    );
}