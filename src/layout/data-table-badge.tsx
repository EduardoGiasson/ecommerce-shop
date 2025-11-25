import { Badge } from "@/components/ui/badge";

type DataTableBadgeProps = {
  status: string;
};

export function DataTableBadge({ status }: DataTableBadgeProps) {
  const isCanceled = status?.toUpperCase() === "CANCELED";

  return (
    <Badge
      variant="outline"
      className={
        isCanceled
          ? "bg-red-100 text-red-700 border-red-300"
          : "bg-blue-100 text-blue-700 border-blue-300"
      }
    >
      {status}
    </Badge>
  );
}
