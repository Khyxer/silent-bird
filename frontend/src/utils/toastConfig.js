import { toast } from "react-hot-toast";

export const showToast = (message, icon = "✅") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#333",
      color: "#fff",
      maxWidth: "500px",
      textAlign: "center",
    },
    position: "bottom-right",
    reverseOrder: true,
  });
};

export const showErrorToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#333",
      color: "#fff",
      maxWidth: "500px",
      textAlign: "center",
    },
     position: "bottom-right",
    reverseOrder: true,
  });
};

export const showWarningToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#604500",
      color: "#fff",
      maxWidth: "500px",
      textAlign: "center",
    },
     position: "bottom-right",
    reverseOrder: true,
  });
};

export const showCriticalErrorToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#ff000080",
      color: "#fff",
      maxWidth: "500px",
      textAlign: "center",
    },
     position: "bottom-right",
    reverseOrder: true,
  });
};
