export interface FormulaDTO {

  id: string;

  energia_kwh: number;

  possui_painel_solar: boolean;

  fator_credito: number;

  creditos_gerados: number;

  valor_kwh: number;

  valor_total: number;

  data_carregamento: string;

  createdAt: string;
}