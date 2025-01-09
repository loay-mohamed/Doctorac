import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/App.Context";
import { useAuth } from "../../context/AuthContext";
import { assets } from "../../assets/assets";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";
import { toast } from "react-hot-toast"; 

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, salary } = useContext(AppContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  function fetchDocInfo() {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 1; i < 8; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) {
    return <div>Loading...</div>;
  }

  const handleBooking = () => {
    if (!currentUser) {
      toast.error("You need to login to book an appointment.", {
        position: "top-center",
        duration: 3000,
      });
      navigate("/");
      return;
    }

    toast.success(`Appointment booked successfully for ${slotTime}`, {
      position: "top-right",
      duration: 3000,
    });
  };

  return (
    <>
      <div>
        {docInfo && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              {docInfo.image ? (
                <img
                  className="bg-slate-500 w-full sm:max-w-72 rounded-lg"
                  src={docInfo.image}
                  alt={docInfo.name || "Doctor Image"}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}{" "}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About{" "}
                  <img className="w-4" src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fees:{" "}
                <span className="text-gray-600">
                  {salary}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-slate-500 text-white"
                      : "border border-gray-400"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-slate-500 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={handleBooking}
            className="bg-slate-500 text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </>
  );
};

export default Appointment;
