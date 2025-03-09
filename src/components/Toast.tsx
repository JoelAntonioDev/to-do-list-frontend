import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 2500, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50"; // Verde
      case "error":
        return "#F44336"; // Vermelho
      case "warning":
        return "#FFC107"; // Amarelo
      default:
        return "#333";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: getBackgroundColor(),
        color: "white",
        padding: "12px 20px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
