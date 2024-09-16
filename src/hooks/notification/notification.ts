import { notification, NotificationArgsProps } from "antd";
import { useCallback } from "react";
type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "info" | "warning" | "error";

const useNotification = () => {
  const openNotification = useCallback(
    (
      type: NotificationType,
      message: string,
      description: string,
      placement: NotificationPlacement = "top",
      duration: number = 5
    ) => {
      notification[type]({
        message,
        description,
        placement,
        duration,
      });
    },
    []
  );

  return openNotification;
};

export default useNotification;
