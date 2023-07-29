import React, { useEffect, useState } from "react";

interface CountdownProps {
  futureTimestamp: number;
}

const Countdown: React.FC<CountdownProps> = ({ futureTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateCounter = () => {
      const now = new Date();
      const futureDate = new Date(futureTimestamp);
      const diffInMilliseconds = futureDate.getTime() - now.getTime();

      if (diffInMilliseconds < 0) {
        setTimeLeft("Time expired");
        return;
      }

      let message = "";

      if (diffInMilliseconds >= 48 * 60 * 60 * 1000) {
        // More than 48 hours
        const days = Math.floor(diffInMilliseconds / (60 * 60 * 24 * 1000));
        message = `${days} days`;
      } else if (diffInMilliseconds >= 24 * 60 * 60 * 1000) {
        // Between 24 and 48 hours
        const hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
        message = `${hours} hours`;
      } else if (diffInMilliseconds >= 60 * 60 * 1000) {
        // Between 1 and 24 hours
        const hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
        const minutes = Math.floor(
          (diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
        );
        message = `${hours} hours and ${minutes} minutes`;
      } else if (diffInMilliseconds >= 60 * 1000) {
        // Less than 1 hour
        const minutes = Math.floor(diffInMilliseconds / (60 * 1000));
        const seconds = Math.floor((diffInMilliseconds % (60 * 1000)) / 1000);
        message = `${minutes} minutes and ${seconds} seconds`;
      } else if (diffInMilliseconds >= 1000) {
        // Less than 1 minute
        const seconds = Math.floor(diffInMilliseconds / 1000);
        const milliseconds = diffInMilliseconds % 1000;
        message = `${seconds} seconds`;
      } else {
        // Less than 1 second
        message = `${diffInMilliseconds} milliseconds`;
      }

      setTimeLeft(message);

      // Adjust interval
      clearInterval(intervalId);
      if (diffInMilliseconds > 1000) {
        intervalId = setInterval(updateCounter, 1000);
      } else {
        intervalId = setInterval(updateCounter, 100);
      }
    };

    // Initial call to start the counter
    updateCounter();

    return () => clearInterval(intervalId);
  }, [futureTimestamp]);
  if (futureTimestamp === null || futureTimestamp === undefined) {
    return <></>;
  }
  return <div>{timeLeft}</div>;
};

export default Countdown;
