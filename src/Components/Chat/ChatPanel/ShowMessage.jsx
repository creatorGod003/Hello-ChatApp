import React, { useMemo, useRef } from "react";

// Responsible for showing messages

const ShowMessage = (props) => {

  const receiverMessage = props.receiverMessage;
  const senderMessage = props.senderMessage;

  console.log(receiverMessage, senderMessage);

  const message = useRef([]);
  const panelState = useRef([]);

  function getMessageDiv(message, isLeft, mid) {
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
          } p-1 rounded ${isLeft ? "ml-2" : "mr-2"} `}
        >
          {message}
        </div>
      </div>
    );
  }

  function getDateDiv(date) {
    return (
      <div className="text-center my-2 font-bold">
        <div className="inline-block bg-slate-300 p-1 rounded">{date}</div>
      </div>
    );
  }

  const panelData2 = useMemo(
    function renderMessage() {
      var i = 0,
        j = 0;
      var tempDate = "";
      var senderDateObj = new Date();
      var receiverDateObj = new Date();

      for (; i < senderMessage.length && j < receiverMessage.length; ) {
        // console.log(i, j);
        senderDateObj = new Date(senderMessage[i][0]);
        receiverDateObj = new Date(receiverMessage[j][0]);

        // console.log(senderDateObj, receiverDateObj);

        if (senderDateObj < receiverDateObj) {
          if (tempDate !== senderDateObj.toString()) {
            message.current.push(getDateDiv(senderDateObj.toDateString()));
            tempDate = senderDateObj.toString();
          }
          message.current.push(
            getMessageDiv(senderMessage[i][1], false, senderMessage[i][0])
          );

          i++;
        } else {
          if (tempDate !== receiverDateObj.toString()) {
            message.current.push(getDateDiv(receiverDateObj.toDateString()));
            tempDate = receiverDateObj.toString();
          }

          message.current.push(
            getMessageDiv(receiverMessage[j][1], true, receiverMessage[j][0])
          );

          j++;
        }
      }

      while (i < senderMessage.length) {
        if (tempDate !== senderDateObj.toString()) {
          message.current.push(getDateDiv(senderDateObj.toDateString()));
          tempDate = senderDateObj.toString();
        }
        message.current.push(
          getMessageDiv(senderMessage[i][1], false, senderMessage[i][0])
        );
        i++;
      }

      while (j < receiverMessage.length) {
        if (tempDate !== receiverDateObj.toString()) {
          message.current.push(getDateDiv(receiverDateObj.toDateString()));
          tempDate = receiverDateObj.toString();
        }
        message.current.push(
          getMessageDiv(receiverMessage[j][1], true, receiverMessage[j][0])
        );
        j++;
      }

      panelState.current.push(message.current);
      return panelState.current;
    },
    [receiverMessage, senderMessage]
  );

  return <div className="my-4">{panelData2}</div>;
};

export default ShowMessage;
