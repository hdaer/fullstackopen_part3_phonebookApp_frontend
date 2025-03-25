// import { useEffect } from "react";

// const NotificationMessage = ({ message, setMessage, messageType }) => {
//   setTimeout(() => {
//     setMessage(null);
//   }, 3000);
//   return <div className={`notification-message ${messageType}`}>{message}</div>;
// };

// export default NotificationMessage;

import { useEffect } from "react";

const NotificationMessage = ({ message, setMessage, messageType }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return message ? (
    <div className={`notification-message ${messageType}`}>{message}</div>
  ) : null;
};

export default NotificationMessage;
