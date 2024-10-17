import React, { useEffect, useState } from "react";
import SlotMachine from "../components/JackpotSpin";
import "aos/dist/aos.css";
import Aos from "aos";
import axios from "axios";

function TenMillion() {
  const [loading, setloading] = useState(false);
  const url = "http://192.168.10.190:5053/v1/getUserDetail/getWinner/3";
  const getUserDetails = async () => {
    setloading(true);
    try {
      const response = await axios.get(url);
      setResultObject(response.data.lotInfo);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
  useEffect(() => {
    getUserDetails();
  }, []);
  const [stage, setStage] = useState(0);
  const [resultObject, setResultObject] = useState({});
  console.log(resultObject);

  useEffect(() => {
    setStage(0);
  }, []);

  return (
    <div className="noise-overlay">
      {loading && <div className="loading">Loading&#8230;</div>}
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
              {resultObject.totalParticipants
                ? resultObject.totalParticipants
                : 0}
            </p>
          </div>

          {/* Box 2 */}
          {/* Box 2 */}
          <div className="bg-gradient-to-b from-gray-200 to-lightblue rounded-[40px] h-full w-full mb-2 p-4 flex flex-col items-center justify-start shadow-md z-40">
            {stage != 0 && stage != 5 && (
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-[21px] mt-2 text-blue-950 font-medium">
                  Боломжит хэрэглэгч
                </span>
                <div className="w-10/12 h-[1px] bg-blue-950 mt-2 mb-5"></div>
              </div>
            )}
            {stage == 5 && (
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-[21px] mt-2 text-blue-950 font-bold">
                  АЗТАН
                </span>
                <div className="w-10/12 h-[1px] bg-blue-950 mt-2 mb-5"></div>
              </div>
            )}

            {stage == 4 ? (
              resultObject?.lastParticipants?.map((participant, inx) => {
                return (
                  <span
                    data-aos="fade-right"
                    data-aos-delay={`${inx * 200}`} // Delay in milliseconds
                    key={inx}
                    className="text-[40px] font-bold text-blue-950"
                  >
                    {participant}
                  </span>
                );
              })
            ) : (
              <span className="text-[70px] font-bold text-blue-950">
                {stage != 0 ? (
                  <div
                    data-aos="fade-down"
                    className="flex gap-2 justify-center items-center"
                  >
                    {resultObject.processArray[stage]}
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

export default TenMillion;
