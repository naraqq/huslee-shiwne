import React, { useEffect, useState } from "react";
import JackpotSpin from "../components/JackpotSpin";
import SlotMachine from "../components/JackpotSpin";
import "aos/dist/aos.css";
import Aos from "aos";
function TwoMillion() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
  const spinResult = 13441;
  const [stage, setStage] = useState(0);
  const resultObject = {
    winnerId: 800002,
    processArray: ["13441", "3314", "270", "38", "10", "800002"],
    totalParticipants: 13441,
    lastParticipants: [
      800000, 800001, 800002, 800003, 800004, 800005, 800006, 800007,
    ],
    wish: "IPHONE16 AWMAAR BAINA",
    smartCardNo: "1000000048",
  };
  useEffect(() => {
    setStage(0);
  }, []);

  console.log("stage: ", stage);

  return (
    <div className="noise-overlay">
      <div className="w-screen h-screen flex relative overflow-hidden">
        {/* Ensure noise overlay doesn't block the interactive elements */}

        <div className="w-full h-full flex flex-col z-40">
          <div className="flex flex-row h-full z-20">
            <img
              src="/img/huslee_hel.png"
              alt="huslee_hel.png"
              className="w-1/4 fixed top-0 left-[3%] z-30"
            />
            <div className="fixed top-1/12 w-full h-1/4 flex justify-center gap-8 items-center z-30">
              <img src="/img/logos 1.png" alt="2say.png" className="h-4/6" />
            </div>
          </div>
        </div>

        {/* Container for jackpot spin and buttons */}
        <div
          className="h-[calc(73%)] fixed bottom-0 left-[5%] w-[calc(70%)] 
                   bg-[linear-gradient(30deg,_#172554,#070545,_#172554)] noise-overlay-box
                   rounded-t-[50px] p-16 z-30 flex items-center justify-start "
        >
          <img
            src="/img/10say.png"
            alt="beleg.png"
            className="h-[calc(60%)] ml-10"
          />
          <div className="z-40">
            <SlotMachine
              result={resultObject}
              stage={stage}
              setStage={setStage}
            />
          </div>
        </div>

        {/* Right-side content */}
        <div
          className="bg-[linear-gradient(30deg,_#172554,#070545,_#172554)] noise-overlay-box-side 
         h-[calc(98%)] w-[calc(20%)] fixed bottom-0 right-[1%] w-4/6 rounded-t-[50px] p-5 z-30 
         flex flex-col items-center"
        >
          <p className="text-white text-xl text-center mb-4 z-40">
            НИЙТ ОЛГОГДСОН <br /> ХҮСЛИЙН КОД
          </p>

          {/* Box 1 */}
          <div className="bg-white rounded-[40px] w-full mb-4 py-2 px-4 flex items-center justify-center shadow-md z-40">
            <p className="text-black text-5xl font-bold text-center">
              {resultObject.totalParticipants}
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-gradient-to-b from-gray-200 to-lightblue rounded-[40px] h-full w-full mb-2 p-4 flex flex-col items-center justify-center shadow-md z-40">
            {/* {resultObject.lastParticipants.map((participant, inx) => {
            return (
              <span key={inx} className="text-4xl font-bold text-green-600">
                {participant}
              </span>
            );
          })} */}
            {stage == 4 ? (
              resultObject.lastParticipants.map((participant, inx) => {
                return (
                  <span
                    data-aos="fade-right"
                    data-aos-delay={`${inx * 200}`} // Delay in milliseconds
                    key={inx}
                    className="text-[50px] font-bold text-black"
                  >
                    {participant}
                  </span>
                );
              })
            ) : (
              <span className="text-[70px] font-bold text-black">
                {stage != 0 ? (
                  <div
                    data-aos="fade-down"
                    className="flex gap-2 justify-center items-center"
                  >
                    {resultObject.processArray[stage]}
                    <img className="h-16" src="img/user.png" alt="" />
                  </div>
                ) : (
                  ""
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoMillion;
