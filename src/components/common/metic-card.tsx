import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For merging Tailwind classes
import type { LucideIcon } from "lucide-react"; // More specific type for icons

// Define the color variants to match your sidebar's aesthetic
const colorVariants = {
  green: {
    gradient: "from-green-500/15 to-teal-500/15",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    titleColor: "text-green-400",
  },
  purple: {
    gradient: "from-purple-500/15 to-violet-500/15",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    titleColor: "text-purple-400",
  },
  orange: {
    gradient: "from-orange-500/15 to-yellow-500/15",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    titleColor: "text-orange-400",
  },
  blue: {
    gradient: "from-blue-500/15 to-cyan-500/15",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    titleColor: "text-blue-400",
  },
};

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: keyof typeof colorVariants;
  className?: string;
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  color = "blue", // Default to 'blue' if no color is provided
  className,
}: MetricCardProps) {
  const variants = colorVariants[color] || colorVariants.blue;

  return (
    <Card
      className={cn(
        "bg-gradient-to-br backdrop-blur-sm border shadow-lg text-white rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-xl",
        variants.gradient,
        "border-white/10",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className={cn("text-lg font-bold", variants.titleColor)}>
              {title}
            </p>
            <p className="text-4xl font-bold text-white">{value}</p>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              variants.iconBg
            )}
          >
            <Icon className={cn("h-7 w-7", variants.iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
