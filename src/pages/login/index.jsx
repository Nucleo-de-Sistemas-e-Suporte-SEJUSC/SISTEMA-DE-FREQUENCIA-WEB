
import { FormLogin } from "../../components/formularios/form-login";
import styles from './style.module.css'
import Background from '../../assets/fundo.png'

export function Login() {
	return (
		<section className={styles["container__login"]}>
			<div className={styles["overlay"]}></div>
			<FormLogin />
		</section>

	);
}
