import { useEffect, useState } from "react";
import { env } from "../../env";

export const NotificationsModal = ({
  notifyCounter,
  setNotifyCounter,
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}/notifications/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("noti",data);
      setNotifications(data.notifications);
      let unviewed = 0;
      data.notifications.forEach((element) => {
        if (!element.viewed) {
          unviewed++;
        }
      });
      setNotifyCounter(unviewed)

    } catch (error) {
      console.error("Server Error:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      getNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-40 bg-black bg-opacity-20">
        <div className="relative p-8 rounded-lg flex flex-col justify-center items-center w-[70%] overflow-hidden">
          <div className="h-[80vh] w-full max-w-md bg-white rounded-lg overflow-y-auto">
            <div className="flex justify-between bg-gray-200 text-gray-700 px-6 py-4">
              <h3 className="font-semibold text-lg">Notificaciones</h3>
              <button className="text-white p-1 rounded-lg" onClick={onClose}>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <path
                    fill="#000000"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  />
                </svg>
              </button>
            </div>
            <div className="divide-y divide-gray-200 px-6 py-4">
              <ul>
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="px-4 mb-2 rounded-md py-2 bg-gray-500 bg-opacity-20"
                  >
                    <a
                      href={`/usuario/${notification.emisor}/`}
                      className="font-semibold hover:underline"
                    >
                      {notification.emisor}
                    </a>
                    
                    {notification.action === "l"
                      ? " ha dado like a una publicación"
                      : " ha empezado a seguirte"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
