import { useEffect, useState } from "react";

import { api } from "@/lib/axios";

export function TransacoesCreditosPage() {
  const [transacoes, setTransacoes] = useState<any[]>([]);

  async function carregar() {
    try {
      const { data } = await api.get("/transacoes-creditos");

      setTransacoes(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Transações ECO
        </h1>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#e2e8f0",
                }}
              >
                <th style={th}>Carteira</th>

                <th style={th}>Energia</th>

                <th style={th}>ECO</th>

                <th style={th}>Valor</th>

                <th style={th}>Data</th>

                <th style={th}>Hash</th>
              </tr>
            </thead>

            <tbody>
              {transacoes.map((item) => (
                <tr key={item.id}>
                  <td style={td}>
                    {item.carteira?.slice(0, 6)}
                    ...
                  </td>

                  <td style={td}>{item.energia_consumida_kwh} kWh</td>

                  <td style={td}>{item.creditos_gerados} ECO</td>

                  <td style={td}>R$ {Number(item.valor_total).toFixed(2)}</td>

                  <td style={td}>{item.data_carregamento}</td>

                  <td style={td}>
                    {item.hash_transacao?.slice(0, 10)}
                    ...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "left" as const,
  borderBottom: "1px solid #cbd5e1",
  fontSize: "14px",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
};
