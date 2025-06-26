import { core } from "@/api/core"
import { ServiceAbstract } from "@/interfaces/service-abstract"

class AnaliseLinearidadeService extends ServiceAbstract {
    async getCalcasLinearidade(id: string, aberrante: boolean) {
        try {
            const response = await core.get("/formula", {
                params: { id, aberrante, tipo_analise: "lienaridade" },
            })

            return response.data
        } catch (error) {
            this.handleAxiosError(error)
        }
    }
}

export { AnaliseLinearidadeService }
