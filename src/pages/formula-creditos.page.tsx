import { useState } from "react";

import {
  FiPrinter,
  FiZap,
} from "react-icons/fi";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

export function FormulaCreditosPage() {
  const [energiaKwh, setEnergiaKwh] =
    useState("");

  const [
    possuiPainelSolar,
    setPossuiPainelSolar,
  ] = useState(false);

  // FATOR FIXO
  const fatorCredito = 1.5;

  const [valorKwh, setValorKwh] =
    useState("");

  const [
    dataCarregamento,
    setDataCarregamento,
  ] = useState("");

  const [
    resultado,
    setResultado,
  ] = useState<null | {
    creditos: number;
    valorTotal: number;
    percentualRenovavel: number;
  }>(null);

  function calcular() {
    const energia =
      Number(energiaKwh);

    const valor =
      Number(valorKwh);

    const percentualRenovavel =
      possuiPainelSolar ? 70 : 0;

    const creditos =
      energia *
      (percentualRenovavel / 100) *
      fatorCredito;

    const valorTotal =
      energia * valor;

    setResultado({
      creditos,
      valorTotal,
      percentualRenovavel,
    });
  }

  async function gerarPDF() {
    const elemento =
      document.getElementById(
        "relatorio",
      );

    if (!elemento) return;

    const original =
      document.documentElement.style
        .colorScheme;

    document.documentElement.style.colorScheme =
      "light";

    const canvas =
      await html2canvas(elemento, {
        backgroundColor:
          "#ffffff",
        useCORS: true,
        onclone: (doc) => {
          const all =
            doc.querySelectorAll("*");

          all.forEach((el) => {
            const htmlEl =
              el as HTMLElement;

            htmlEl.style.color =
              "#000000";

            htmlEl.style.backgroundColor =
              "#ffffff";

            htmlEl.style.borderColor =
              "#d1d5db";
          });
        },
      });

    document.documentElement.style.colorScheme =
      original;

    const imagem =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4",
    );

    const larguraPDF = 210;

    const alturaPDF =
      (canvas.height *
        larguraPDF) /
      canvas.width;

    pdf.addImage(
      imagem,
      "PNG",
      0,
      0,
      larguraPDF,
      alturaPDF,
    );

    pdf.save(
      `relatorio-creditos-${dataCarregamento}.pdf`,
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        width: "100%",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          color: "#000",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <FiZap
            size={28}
            style={{
              color: "#16a34a",
            }}
          />

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Fórmula de Créditos
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Energia Consumida
              (kWh)
            </label>

            <input
              type="number"
              value={energiaKwh}
              onChange={(e) =>
                setEnergiaKwh(
                  e.target.value,
                )
              }
              placeholder="Ex: 50"
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={
                possuiPainelSolar
              }
              onChange={(e) =>
                setPossuiPainelSolar(
                  e.target.checked,
                )
              }
            />

            <label
              style={{
                fontWeight: "600",
              }}
            >
              Possui painel solar
            </label>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Valor kWh
            </label>

            <input
              type="number"
              value={valorKwh}
              onChange={(e) =>
                setValorKwh(
                  e.target.value,
                )
              }
              placeholder="Ex: 1.25"
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Data do carregamento
            </label>

            <input
              type="date"
              value={
                dataCarregamento
              }
              onChange={(e) =>
                setDataCarregamento(
                  e.target.value,
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
              }}
            />
          </div>

          <button
            onClick={calcular}
            style={{
              background: "#15803d",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Calcular Créditos
          </button>

          {resultado && (
            <>
              <div
                id="relatorio"
                style={{
                  background:
                    "#f3f4f6",
                  border:
                    "1px solid #d1d5db",
                  borderRadius:
                    "16px",
                  padding: "24px",
                  marginTop: "16px",
                  color: "#000",
                }}
              >
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight:
                      "bold",
                    marginBottom:
                      "20px",
                  }}
                >
                  Relatório de
                  Carregamento
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: "12px",
                    fontSize: "15px",
                  }}
                >
                  <span>
                    Energia Consumida:
                    {" "}
                    <strong>
                      {
                        energiaKwh
                      }{" "}
                      kWh
                    </strong>
                  </span>

                  <span>
                    Energia Renovável:
                    {" "}
                    <strong>
                      {possuiPainelSolar
                        ? "SIM"
                        : "NÃO"}
                    </strong>
                  </span>

                  <span>
                    Percentual Renovável:
                    {" "}
                    <strong>
                      {
                        resultado.percentualRenovavel
                      }
                      %
                    </strong>
                  </span>

                  <span>
                    Fator de Crédito:
                    {" "}
                    <strong>
                      {fatorCredito}
                    </strong>
                  </span>

                  <span>
                    Créditos Gerados:
                    {" "}
                    <strong>
                      {
                        resultado.creditos
                      }
                    </strong>
                  </span>

                  <span>
                    Valor Total:
                    {" "}
                    <strong>
                      R$
                      {" "}
                      {resultado.valorTotal.toFixed(
                        2,
                      )}
                    </strong>
                  </span>

                  <span>
                    Data:
                    {" "}
                    <strong>
                      {
                        dataCarregamento
                      }
                    </strong>
                  </span>
                </div>
              </div>

              <button
                onClick={gerarPDF}
                style={{
                  marginTop: "24px",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                  background:
                    "#2563eb",
                  color: "#fff",
                  padding:
                    "12px 18px",
                  borderRadius:
                    "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                <FiPrinter />
                Gerar PDF
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}