import { toast } from "react-hot-toast";

export const showToast = (message, icon = "👏") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showErrorToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showWarningToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#604500",
      color: "#fff",
    },
  });
};

export const showCriticalErrorToast = (message, icon = "⚠️") => {
  toast(message, {
    icon,
    style: {
      borderRadius: "999px",
      background: "#ff000080",
      color: "#fff",
    },
  });
};
