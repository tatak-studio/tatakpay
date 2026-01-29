export interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: "bg-green-50 text-green-600 border-green-200",
    error: "bg-red-50 text-red-600 border-red-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    info: "bg-blue-50 text-blue-600 border-blue-200",
  };

  return (
    <div
      className={`p-3 rounded-lg text-sm border flex items-center justify-between ${styles[type]}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
}
