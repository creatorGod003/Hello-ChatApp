import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { selectContact } from "../../../features/ContactSelect/contactSelectSlice";

// Responsible for showing user contacts. It shows its profile image, username along with last message and its arrival time.

const UserContact = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useSelector((state) => {
    return state.responsive.isMobile;
  });
  const index = props.index;

  const selected = useSelector((state) => {
    return JSON.parse(state.contactSelect.contactSelect)[index];
  });

  const onSelect = () => {
    dispatch(selectContact(index));
    dispatch(updateuser(props.userData));
    if (isMobile) navigate("/chatpanel");
  };

  return (
    <div
      className={` ${
        selected ? "bg-gray-500 rounded-lg" : "bg-inherit"
      } flex justify-around items-center p-2 my-1 cursor-pointer`}
      onClick={onSelect}
    >
      <img
        src={props.userData.profileURL}
        alt="contact reference"
        className="w-16 h-16 rounded-full"
      />
      <div className="basis-3/4 ml-2 text-white">
        <div>{props.userData.username}</div>
      </div>
    </div>
  );
};

export default UserContact;
