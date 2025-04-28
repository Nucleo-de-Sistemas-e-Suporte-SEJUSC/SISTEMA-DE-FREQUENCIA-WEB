import { api } from "../axios"

export async function pegaSetoresAPI(setTodosSetores, setSetoresFiltrados) {
        const resposta = await api.get('/buscar_setor')
        const { setores } = await resposta.data
        setTodosSetores(setores)
        setSetoresFiltrados(setores)
}