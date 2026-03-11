import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({
  open,
  title = "Confirmar exclusão",
  description = "Tem certeza que deseja excluir este item?",
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-red-600">
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">{description}</p>

        <DialogFooter className="flex gap-2 justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Excluir
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
