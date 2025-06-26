import { AnaliseLinearidadeService } from "@/services/core/analises/linearidade"

function useLinearidade() {
    const service = new AnaliseLinearidadeService()
    const result = service.getCalcasLinearidade("oi", true)

    // const { descompactar o response.data } = service.getCalcasLinearidade("oi", true)
    return result
    // return { itens descompactados }
}

export { useLinearidade }
