import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "small" | "large" | "icon";
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  size = "default", 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "rounded-md text-white font-medium transition",
        variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700",
        size === "small" && "px-2 py-1 text-sm",
        size === "large" && "px-6 py-3 text-lg",
        size === "icon" && "p-2 w-10 h-10 flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
};
