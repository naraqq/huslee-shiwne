import React, { useState, useRef, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function SlotMachine({ result, setStage, stage }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const jackpotWheels = [
    [
      result?.winnerId ? result?.winnerId[1] : "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ],
    [
      result?.winnerId ? result?.winnerId[2] : "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ],
    [
      result?.winnerId ? result?.winnerId[3] : "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ],
    [
      result?.winnerId ? result?.winnerId[4] : "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ],
    [
      result?.winnerId ? result?.winnerId[5] : "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ],
  ];
  const [spinned, setSpinned] = useState(new Array(5).fill(false)); // Change to an array for each wheel
  const [animated, setAnimated] = useState(new Array(5).fill(false)); // Change to an array for each wheel
  const wheelRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the Ctrl key is pressed and the key '1' is pressed
      if (event.ctrlKey && event.key === "1") {
        event.preventDefault(); // Prevent default behavior if needed
        startJackpot(); // Call startJackpot after refs are initialized
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Initialize the wheel refs when component mounts
    wheelRefs.current = jackpotWheels.map(() => React.createRef());
    setSpinned(new Array(jackpotWheels.length).fill(false)); // Reset individual spin states
    setAnimated(new Array(jackpotWheels.length).fill(false)); // Reset individual spin states

    // randomizeWheels();
  }, []);

  const startJackpot = () => {
    // Start the slot machine animation for each wheel
    jackpotWheels.forEach((wheel, index) => {
      const time = 100 * index; // Add some delay between each wheel's spin

      setTimeout(() => {
        const wheelElement = wheelRefs.current[index].current; // Access ref directly
        if (wheelElement) {
          // Start animation by adding the 'animated' class
          wheelElement.classList.add("animated");

          // Set the spinning state for this specific wheel to true
          setSpinned((prev) => {
            const newSpinned = [...prev];
            newSpinned[index] = true; // Set the specific wheel's spinning state to true
            return newSpinned;
          });

          // Set the spinning state for this specific wheel to true
          setAnimated((prev) => {
            const newAnimated = [...prev];
            newAnimated[index] = true; // Set the specific wheel's spinning state to true
            return newAnimated;
          });

          // End animation after 5 seconds
          setTimeout(() => {
            wheelElement.classList.remove("animated");
            setStage((prev) => {
              let newStage = prev;
              newStage++;
              return newStage;
            });
            // Set the spinning state for this specific wheel to false after spinning
            setSpinned((prev) => {
              const newSpinned = [...prev];
              newSpinned[index] = false; // Set the specific wheel's spinning state to false
              return newSpinned;
            });
          }, (index + 5) * 1000 * (index + 1)); // 5-second spin for each wheel
        }
      }, time);
    });
  };

  return (
    <div className="slot-machine-container ">
      <div className="fixed h-screen w-screen top-[calc(10%)] right-[calc(1%)] flex items-center justify-center">
        <div className="relative flex select-none">
          <div className="jackpot flex">
            <div className="jackpot__wheel2">
              <span className="text-[90px] font-bold leading-[100px] py-1">
                {result?.winnerId ? result?.winnerId[0] : "0"}
              </span>
            </div>
            <span className="text-[90px] text-white font-bold leading-none py-1">
              -
            </span>
          </div>
          <div className="jackpot__screen flex">
            {jackpotWheels.map((wheel, index) => {
              return (
                <ul
                  key={index}
                  className="jackpot__wheel"
                  ref={wheelRefs.current[index]} // Set ref correctly
                >
                  {wheel.map((item, idx) => (
                    <li
                      key={idx}
                      className={`text-[90px] font-bold flex items-center justify-center w-11 leading-none py-1 `}
                    >
                      {spinned[index] ? (
                        <div
                          className="bg-white px-2  h-[110px] flex items-center justify-center
                         rounded-2xl mt-[-4px] pt-[-10px] leading-relaxed"
                        >
                          {item}
                        </div>
                      ) : animated[index] ? (
                        <div
                          className="bg-white px-2  h-[110px] flex items-center justify-center
                         rounded-2xl mt-[-4px] pt-[-10px] leading-relaxed"
                        >
                          {item}
                        </div>
                      ) : (
                        <div
                          className="bg-white px-4  h-[110px] flex items-center justify-center
                         rounded-2xl pt-2  mt-[-4px] "
                        >
                          *
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              );
            })}
            {stage == 5 && (
              <div
                data-aos="fade-up"
                className="fixed bottom-[calc(10%)] left-[calc(30%)] w-full flex flex-col px-10 py-5"
              >
                <div className="flex text-[20px] text-white text-end">
                  <span className="min-w-[220px] mr-4">
                    <i>Смарт картын дугаар :</i>
                  </span>
                  <span>
                    <i> {result.smartCardNo}</i>
                  </span>
                </div>
                <div className="flex text-[20px] text-white text-end">
                  <span className="min-w-[220px] mr-4">
                    <i>Хүсэл :</i>
                  </span>
                  <span>
                    <i> {result.wish}</i>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
