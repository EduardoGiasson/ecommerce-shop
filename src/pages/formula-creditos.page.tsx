import { useState } from "react";

import { FiPrinter, FiZap, FiCheckCircle } from "react-icons/fi";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

import { ethers } from "ethers";

import { toast } from "react-toastify";

import { api } from "@/lib/axios";

export function FormulaCreditosPage() {
  const [energiaKwh, setEnergiaKwh] = useState("");

  const [possuiPainelSolar, setPossuiPainelSolar] = useState(false);

  const [valorKwh, setValorKwh] = useState("");

  const [dataCarregamento, setDataCarregamento] = useState("");

  const [wallet, setWallet] = useState("");

  const [loading, setLoading] = useState(false);

  const fatorCredito = 1.5;

  // CONTRATO
  const CONTRACT_ADDRESS = "0x3D441E7CCb031A17b7Bb436B9f6e64E72d366fd3";

  // ABI
  const ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Burn",
      type: "event",
    },

    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },

    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [resultado, setResultado] = useState<null | {
    creditos: number;
    valorTotal: number;
    percentualRenovavel: number;
  }>(null);

  async function conectarCarteira() {
    if (!window.ethereum) {
      toast.error("MetaMask não encontrada");

      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);

      const contas = await provider.send("eth_requestAccounts", []);

      setWallet(contas[0]);

      toast.success("Carteira conectada!");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao conectar carteira");
    }
  }

  function calcular() {
    const energia = Number(energiaKwh);

    const valor = Number(valorKwh);

    const percentualRenovavel = possuiPainelSolar ? 70 : 0;

    const creditos = energia * (percentualRenovavel / 100) * fatorCredito;

    const valorTotal = energia * valor;

    setResultado({
      creditos,
      valorTotal,
      percentualRenovavel,
    });

    toast.success("Créditos calculados com sucesso!");
  }

  async function salvarTransacao(hash: string) {
    if (!resultado) return;

    await api.post("/transacoes-creditos", {
      carteira: wallet,

      energia_consumida_kwh: Number(energiaKwh),

      possui_painel_solar: possuiPainelSolar,

      fator_credito: fatorCredito,

      creditos_gerados: Number(resultado.creditos.toFixed(0)),

      valor_kwh: Number(valorKwh),

      valor_total: resultado.valorTotal,

      data_carregamento: dataCarregamento,

      hash_transacao: hash,
    });
  }

  async function resgatarCreditos() {
    try {
      if (!wallet) {
        toast.error("Conecte a MetaMask primeiro");

        return;
      }

      if (!resultado) {
        toast.error("Calcule os créditos primeiro");

        return;
      }

      setLoading(true);

      // MANTÉM TROCA DE REDE
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",

        params: [
          {
            chainId: "0xaa36a7",
          },
        ],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contrato = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const quantidade = Number(resultado.creditos.toFixed(0));

      // ENVIA TRANSAÇÃO
      const tx = await contrato.mint(wallet, quantidade);

      // FEEDBACK IMEDIATO
      toast.info("Transação enviada para blockchain...");

      // SALVA IMEDIATAMENTE
      await salvarTransacao(tx.hash);

      // CONFIRMA EM BACKGROUND
      tx.wait().then(() => {
        toast.success(`${quantidade} ECO enviados com sucesso!`);
      });

      // LIBERA TELA MAIS RÁPIDO
      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);

      toast.error("Erro ao enviar créditos");
    }
  }

  async function gerarPDF() {
    const elemento = document.getElementById("relatorio");

    if (!elemento) return;

    const canvas = await html2canvas(elemento, {
      backgroundColor: "#ffffff",
    });

    const imagem = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const larguraPDF = 210;

    const alturaPDF = (canvas.height * larguraPDF) / canvas.width;

    pdf.addImage(imagem, "PNG", 0, 0, larguraPDF, alturaPDF);

    pdf.save(`relatorio-creditos-${dataCarregamento}.pdf`);

    toast.success("PDF gerado!");
  }

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        background: "#eef2f7",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          color: "#000",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <FiZap
            size={24}
            style={{
              color: "#16a34a",
            }}
          />

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            Créditos ECO
          </h1>
        </div>

        {/* BOTÃO WALLET */}
        <button
          onClick={conectarCarteira}
          style={{
            width: "100%",
            background: "#111827",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            marginBottom: "18px",
            fontSize: "14px",
          }}
        >
          {wallet
            ? `Carteira: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`
            : "Conectar MetaMask"}
        </button>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          {/* ENERGIA */}
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Energia (kWh)
            </label>

            <input
              type="number"
              value={energiaKwh}
              onChange={(e) => setEnergiaKwh(e.target.value)}
              placeholder="50"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* VALOR */}
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Valor kWh
            </label>

            <input
              type="number"
              value={valorKwh}
              onChange={(e) => setValorKwh(e.target.value)}
              placeholder="1.25"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* DATA */}
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Data
            </label>

            <input
              type="date"
              value={dataCarregamento}
              onChange={(e) => setDataCarregamento(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* CHECK */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "28px",
            }}
          >
            <input
              type="checkbox"
              checked={possuiPainelSolar}
              onChange={(e) => setPossuiPainelSolar(e.target.checked)}
            />

            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Painel Solar
            </label>
          </div>
        </div>

        {/* BOTÕES */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "18px",
          }}
        >
          <button
            onClick={calcular}
            style={{
              flex: 1,
              background: "#15803d",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Calcular
          </button>

          <button
            onClick={resgatarCreditos}
            disabled={loading}
            style={{
              flex: 1,
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Enviando..." : "Resgatar ECO"}
          </button>

          <button
            onClick={gerarPDF}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FiPrinter />
            PDF
          </button>
        </div>

        {/* RELATÓRIO */}
        {resultado && (
          <div
            id="relatorio"
            style={{
              marginTop: "18px",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              <FiCheckCircle
                style={{
                  color: "#16a34a",
                }}
              />

              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                Relatório
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span>
                Energia:
                <strong> {energiaKwh} kWh</strong>
              </span>

              <span>
                Renovável:
                <strong> {resultado.percentualRenovavel}%</strong>
              </span>

              <span>
                Créditos:
                <strong> {resultado.creditos.toFixed(0)} ECO</strong>
              </span>

              <span>
                Valor:
                <strong> R$ {resultado.valorTotal.toFixed(2)}</strong>
              </span>

              <span>
                Painel Solar:
                <strong> {possuiPainelSolar ? "SIM" : "NÃO"}</strong>
              </span>

              <span>
                Data:
                <strong> {dataCarregamento}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
