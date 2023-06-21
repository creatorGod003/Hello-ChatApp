import React, { useEffect, useMemo, useRef } from "react";

// Responsible for showing messages

const ShowMessage = (props) => {

  const receiverMessage = props.receiverMessage;
  const senderMessage = props.senderMessage;
  const message = useRef([]);
  const panelState = useRef([]);
  
  function getMessageDiv(message, isLeft, mid, time) {

    return (
      <div
        key={mid}
        className={`${isLeft ? "mr-auto" : "ml-auto"} ${
          isLeft ? "text-left" : "text-right"
        } text-black w-[40%] my-1`}
      >
        <div
          className={`inline-block ${
            isLeft ? "bg-red-300" : "bg-blue-300"
          } p-1 rounded ${isLeft ? "ml-2" : "mr-2"} relative`}
        >
          {message}
          <div className={`text-gray-600 ${isLeft?'text-right':'text-left'}`}>
            {time}
          </div>
        </div>
        

      </div>
    );
  }

  function getDateDiv(date, time) {
    console.log(date)
    return (
      <div className="text-center my-2 font-bold relative">
        <div className="inline-block bg-slate-300 p-1 rounded">{date}</div>
      </div>
    );
  }

  const panelData2 = useMemo(
    function renderMessage() {
      var i = 0,j = 0;
      var tempDate = "";
      var senderDateObj = new Date();
      var receiverDateObj = new Date();

      for (; i < senderMessage.length && j < receiverMessage.length; ) {
        
        senderDateObj = new Date(senderMessage[i][0]);
        receiverDateObj = new Date(receiverMessage[j][0]);

        const senderTimeString = senderDateObj.toLocaleTimeString().split(":")[0] + ":" + senderDateObj.toLocaleTimeString().split(":")[1]+ " " + senderDateObj.toLocaleTimeString().split(" ")[1];
        const receiverTimeString = receiverDateObj.toLocaleTimeString().split(":")[0] + ":" + receiverDateObj.toLocaleTimeString().split(":")[1]+ " " + receiverDateObj.toLocaleTimeString().split(" ")[1];

        if (senderDateObj < receiverDateObj) {
          if (tempDate !== senderDateObj.toDateString()) {
            message.current.push(getDateDiv(senderDateObj.toDateString()));
            tempDate = senderDateObj.toDateString();
          }
          message.current.push(
            getMessageDiv(senderMessage[i][1], false, senderMessage[i][0], senderTimeString)
          );

          i++;
        } else {
          if (tempDate !== receiverDateObj.toDateString()) {
            message.current.push(getDateDiv(receiverDateObj.toDateString()));
            tempDate = receiverDateObj.toDateString();
          }

          message.current.push(
            getMessageDiv(receiverMessage[j][1], true, receiverMessage[j][0], receiverTimeString)
          );

          j++;
        }
      }

      while (i < senderMessage.length) {

        const senderTimeString = senderDateObj.toLocaleTimeString().split(":")[0] + ":" + senderDateObj.toLocaleTimeString().split(":")[1]+ " " + senderDateObj.toLocaleTimeString().split(" ")[1];

        if (tempDate !== senderDateObj.toDateString()) {
          message.current.push(getDateDiv(senderDateObj.toDateString()));
          tempDate = senderDateObj.toDateString();
        }
        message.current.push(
          getMessageDiv(senderMessage[i][1], false, senderMessage[i][0], senderTimeString)
        );
        i++;
      }

      while (j < receiverMessage.length) {
        const receiverTimeString = receiverDateObj.toLocaleTimeString().split(":")[0] + ":" + receiverDateObj.toLocaleTimeString().split(":")[1]+ " " + receiverDateObj.toLocaleTimeString().split(" ")[1];
        if (tempDate !== receiverDateObj.toDateString()) {
          message.current.push(getDateDiv(receiverDateObj.toDateString()));
          tempDate = receiverDateObj.toDateString();
        }
        message.current.push(
          getMessageDiv(receiverMessage[j][1], true, receiverMessage[j][0], receiverTimeString)
        );
        j++;
      }

      panelState.current.push(message.current);
      return panelState.current;
    },
    [receiverMessage, senderMessage]
  );

    
  useEffect(() => {
    panelState.current = [];
    message.current = [];
  }, [senderMessage, receiverMessage]);

  return <div className="my-4">{panelData2}</div>;
};

export default ShowMessage;
