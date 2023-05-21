import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes,listAll, deleteObject } from "firebase/storage";
import { db, storage } from "../FirebaseConfigs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserDashboard = () => {
  const params = useParams();
  const userId = params.userid;
  const invalidUser = false;

  const loggedInUserId = useSelector((state) => state.userSignIn.userId);
  const loggedInUserEmail = useSelector(
    (state) => JSON.parse(state.userSignIn.user).email
  );

  function uploadFile(e) {


    const folderRef = ref(storage, `images/${loggedInUserId}`)
    listAll(folderRef).then((listResults) => {
        listResults.items.forEach((itemRef) => {
          deleteObject(itemRef).then(() => {
            console.log(`File deleted successfully`)
          }).catch((error) => {
            console.log("Error deleting file", error)
          });
        })
    });

    const file = e.target.files[0];
    console.log(typeof file, file);
    let reader = new FileReader();
    console.log(typeof reader, reader);
    reader.readAsArrayBuffer(file);
    const storageRef = ref(storage, `images/${loggedInUserId}/${file.name}`);
    reader.onload = function () {
      uploadBytes(storageRef, reader.result).then((snapshot) => {
        getDownloadURL(ref(storage, `images/${loggedInUserId}/${file.name}`))
          .then((url) => {
            document.getElementById("profile-photo-preview").src = url;
            updateUserProfileURL(url);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  async function handleProfilePhoto() {
    const docRef = doc(db, "users", loggedInUserEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (docSnap.data().profileURL) {
        document.getElementById("profile-photo-preview").src =
          docSnap.data().profileURL;
      } else {
        let character = loggedInUserId.charAt(0).toLowerCase();
        let regExp = /[a-z]/i;
        let numberRegExp = /[0-9]/i;

        var URL = "";

        if (regExp.test(character)) {
          URL = `/Images/user_${character}.jpeg`;
        } else if (numberRegExp.test(character)) {
          let n = Math.floor(Math.random() * 10);
          URL = `/Images/$user_num_${n}.jpeg`;
        } else {
          URL = `/Images/user_special.jpeg`;
        }

        document.getElementById("profile-photo-preview").src = URL;

        updateUserProfileURL(URL);
      }
    } else {
      console.log("No such document!");
    }
  }

  function updateUserProfileURL(URL) {
    console.log(loggedInUserEmail);
    const userDataRef = doc(db, "users", loggedInUserEmail);
    setDoc(userDataRef, { profileURL: URL }, { merge: true });
  }

  useEffect(() => {
    handleProfilePhoto();
  }, []);

  return (
    <div className="">
      {invalidUser ? (
        <div className="text-red">Invalid User</div>
      ) : (
        <div className="grid grid-rows-6 grid-cols-4 h-screen ">
          <div className="grid col-span-full row-start-1 row-span-2 bg-gradient-to-b from-blue-500 to-teal-500 place-items-center rounded-b-xl shadow-lg shadow-slate-400">
            <div className="flex flex-col items-center">
              <div className="relative">
                <input
                  type="file"
                  id="profile-photo"
                  className="w-8 h-8 rounded-full absolute top-0 right-0 bg-inherit z-10 bg-blue-200 opacity-0"
                  onChange={uploadFile}
                  accept="image/*"
                />
                <img
                  id="profile-photo-preview"
                  alt="profile"
                  loading="eager"
                  src=""
                  className="w-20 h-20 rounded-full border-4 border-white border-l-0 border-t-0 opacity-70"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-8 h-8 absolute top-0 right-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
              <p className="my-2 font-bold">{loggedInUserId}</p>
            </div>
          </div>

          <div className="row-start-3 row-span-2 col-span-full">
            <div className="flex flex-col h-full justify-start text-xl py-20">
              <Link
                to={`/user/${userId}/setting`}
                className="flex justify-center my-2 hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Setting
              </Link>

              <Link
                to={`/user/${userId}/edit`}
                className="flex justify-center my-2 hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit Profile
              </Link>

              <Link
                to={`/home`}
                className="flex justify-center my-2 hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Home
              </Link>
            </div>
          </div>

          <div className="row-start-6 row-span-full col-span-full place-self-center">
            Made with ❤️ by Ashutosh Ranjan
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
