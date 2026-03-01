import type { AgendamentoDTO } from "../dtos/agendamento.dto";

type Props = {
  data: AgendamentoDTO[];
  loading?: boolean;
  onEdit: (agendamento: AgendamentoDTO) => void;
};

export function AgendamentoDataTable({ data, loading, onEdit }: Props) {
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Cliente</th>
            <th className="p-3">Eletroposto</th>
            <th className="p-3">Carro</th>
            <th className="p-3">Data</th>
            <th className="p-3">Início</th>
            <th className="p-3">Fim</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.customer?.name}</td>
              <td className="p-3">{item.eletroposto?.name}</td>
              <td className="p-3">{item.car?.name}</td>
              <td className="p-3">{item.data}</td>
              <td className="p-3">{item.horaInicio}</td>
              <td className="p-3">{item.horaFim}</td>
              <td className="p-3 capitalize">{item.status}</td>
              <td className="p-3">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}