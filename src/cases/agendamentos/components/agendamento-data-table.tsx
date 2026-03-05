import type { AgendamentoDTO } from "../dtos/agendamento.dto";

type Props = {
  data: AgendamentoDTO[];
  loading?: boolean;
  onEdit: (agendamento: AgendamentoDTO) => void;
};

export function AgendamentoDataTable({ data, loading, onEdit }: Props) {
  if (loading) {
    return <p className="text-gray-600">Carregando...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr className="text-sm font-semibold text-gray-900">
            <th className="p-4">Cliente</th>
            <th className="p-4">Eletroposto</th>
            <th className="p-4">Carro</th>
            <th className="p-4">Data</th>
            <th className="p-4">Início</th>
            <th className="p-4">Fim</th>
            <th className="p-4">Status</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-800">{item.customer?.name}</td>
              <td className="p-4 text-gray-800">{item.eletroposto?.name}</td>
              <td className="p-4 text-gray-800">{item.car?.name}</td>
              <td className="p-4 text-gray-700">{item.data}</td>
              <td className="p-4 text-gray-700">{item.horaInicio}</td>
              <td className="p-4 text-gray-700">{item.horaFim}</td>
              <td className="p-4 capitalize text-gray-800">{item.status}</td>
              <td className="p-4">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition"
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
