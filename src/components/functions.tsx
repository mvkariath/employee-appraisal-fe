export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getProgressColorClass = (value: number) => {
  if (value < 20) return "bg-red-200 [&>div]:bg-red-500";
  if (value < 40) return "bg-orange-200 [&>div]:bg-orange-500";
  if (value < 60) return "bg-yellow-200 [&>div]:bg-yellow-500";
  if (value < 80) return "bg-blue-200 [&>div]:bg-blue-500";
  return "bg-green-200 [&>div]:bg-green-600";
};
