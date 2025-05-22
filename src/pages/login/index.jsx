import { useLogin } from '../../hooks/useLogin';
import styles from './style.module.css'

export function LoginScreen() {
	const {
		credentials,
		handleMatriculaChange,
		handlePasswordChange,
		handleSubmit
	} = useLogin()

	return (
		<div className={styles["container__login"]}>
			<div className={styles["container__form"]}>
				<div>
					<h1 className={styles["container__form__titulo__header"]}>SEJUSC - RH</h1>
				</div>

				<div className={styles["container__section__form"]}>
					<form className={styles["form"]}>
						<div className={styles["container__input"]}>
							<label htmlFor="matricula" className={styles["label__form"]}>Matrícula</label>
							<input
								type="text"
								name="matricula"
								id="matricula"
								placeholder="Matrícula"
								className={styles["input__form"]}
								value={credentials.matricula}
								onChange={({ target }) => handleMatriculaChange(target.value)}
							/>
						</div>
						<div className={styles["container__input"]}>
							<label htmlFor="senha" className={styles["label__form"]}>Senha</label>
							<input
								type="password"
								name="senha"
								id="senha"
								placeholder="Senha"
								className={styles["input__form"]}
								value={credentials.password}
								onChange={({ target }) => handlePasswordChange(target.value)}
							/>
						</div>

						<div className={styles["container__button"]}>
							<button onClick={handleSubmit} className={styles["form__button"]}>
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	);
}
