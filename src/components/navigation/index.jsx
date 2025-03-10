import { NavLink } from "react-router-dom";
import "./navigation.css";

export function Navigation() {
    return (
        <section className="container__navigation">
            <nav className="navigation">
                <div className="navigation__list">
                    <div>
                        <NavLink 
                            to="/gerar" 
                            className={({ isActive }) => 
                                isActive ? "link active" : "link"
                            }
                        >
                            Gerar
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            to="/visualizar" 
                            className={({ isActive }) => 
                                isActive ? "link active" : "link"
                            }
                        >
                            Visualizar
                        </NavLink>
                    </div>
                    <div>
                        <NavLink 
                            to="/frequencia-mensal" 
                            className={({ isActive }) => 
                                isActive ? "link active" : "link"
                            }
                        >
                            Frequência Mensal
                        </NavLink>
                    </div>
                </div>
            </nav>
        </section>
    );
}