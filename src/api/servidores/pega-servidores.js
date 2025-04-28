import { api } from "../axios"

 export async function pegaServidoresAPI(filtroNomes,setServidores ) {
        const resposta = await api.get(`/servidores`, {
            params: {
                nome: filtroNomes
            }
        })
        const { servidores } = await resposta.data
        setServidores(servidores)
    }