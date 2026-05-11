export interface TransacaoCreditosDTO {
  id: string;

  carteira: string;

  energia_consumida_kwh: number;

  possui_painel_solar: boolean;

  fator_credito: number;

  creditos_gerados: number;

  valor_kwh: number;

  valor_total: number;

  data_carregamento: string;

  hash_transacao: string;

  criado_em: string;
}
