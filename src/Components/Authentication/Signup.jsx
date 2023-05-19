import React, { useEffect, useState } from "react";
import { db, firebaseAuth } from "../FirebaseConfigs/FirebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../Context/Auth";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retype_password, setRetypePassword] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [phone, setPhone] = useState("");
  const error = "This is require field";

  const globalAuth = useAuth();

  const [requireUserName, setRequireUsername] = useState(false);
  const [requireEmail, setRequireEmail] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [require_retype_password, setRequireRetypePassword] = useState(false);
  const [require_country_code, setRequireCountryCode] = useState(false);
  const [require_mobile_number, setRequireMobileNumber] = useState(false);
  const [require_password_match, setRequirePasswordMatch] = useState(false);

  const [userNameAlreadyExists, setUserNameAlreadyExists] = useState(false);

  function setRequireOff() {
    setRequireUsername(false);
    setRequireEmail(false);
    setRequirePassword(false);
    setRequireRetypePassword(false);
    setRequireCountryCode(false);
    setRequireMobileNumber(false);
    setRequirePasswordMatch(false);
  }

  function resetFields() {
    setUserName("");
    setEmail("");
    setPassword("");
    setRetypePassword("");
    setCountryCode("");
    setMobileNumber("");
    setPhone("");
  }

  function handleSignUp(e) {
    e.preventDefault();

    /* validation */

    if (username === "") {
      setRequireUsername(true);
    }
    if (email === "") {
      setRequireEmail(true);
    }
    if (password === "") {
      setRequirePassword(true);
    }
    if (retype_password === "") {
      setRequireRetypePassword(true);
    }
    if (country_code === "") {
      setRequireCountryCode(true);
    }
    if (mobile_number === "") {
      setRequireMobileNumber(true);
    }

    if (password !== retype_password) {
      setRequirePasswordMatch(true);
    }

    if (
      !email ||
      !username ||
      !password ||
      !retype_password ||
      !country_code ||
      !mobile_number ||
      password !== retype_password
    ) {
      console.log("Invalid Details. Kindly check again.");
      return;
    }

    setPhone(country_code + mobile_number);
    addUser();

    // firebaseAuth.signOut().then(() => {
    //   console.log("Signed out");
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });
    resetFields();
  }

  async function createEmailNumberDoc() {
    try {
      console.log("email number doc adding");

      await setDoc(doc(db, "email_number_mapping", phone), {
        email: email,
      });
      console.log("email number doc added");
    } catch (err) {
      console.log(err);
    }
  }

  function getMatchedURL(loggedInUserId) {
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

    return URL;
  }

  async function createUserDoc() {
    const profileURL = getMatchedURL(username);

    try {
      const userObject = {
        username,
        email,
        password,
        phone,
        description: "",
        name: "",
        profileURL,
      };
      console.log("user doc adding");
      await setDoc(doc(db, "users", email), userObject);
      console.log("user doc added");
      createEmailNumberDoc();
    } catch (err) {
      console.log(err);
    }
  }

  async function addUser() {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserDoc();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    if (country_code !== "" && mobile_number !== "")
      setPhone(country_code + mobile_number);
  }, [mobile_number, country_code]);

  return (
    <div className="min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500 flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%] mx-auto border border-slate-800 rounded-2xl shadow-2xl p-2 bg-white">
        <h2 className="text-center font-bold my-2 text-2xl">Sign Up</h2>
        <form action="" className="flex flex-col items-left">
          {requireUserName ? (
            <div className="text-red-600  pl-3">*{error}</div>
          ) : null}
          {userNameAlreadyExists ? (
            <div className="text-red-600 pl-3">Username already exists</div>
          ) : null}
          <input
            autoComplete={"on"}
            className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600"
            onChange={(e) => {
              setUserNameAlreadyExists(false);
              setUserName(e.target.value);
              setRequireOff();
            }}
            onMouseLeave={(e) => {
              if (username.length !== 0) {
                const userRef = collection(db, "users");
                const q = query(userRef, where("username", "==", username));

                getDocs(q)
                  .then((data) => {
                    if (data.docs.length !== 0) {
                      setUserNameAlreadyExists(true);
                      console.log(data.docs.length !== 0);
                    }
                  })
                  .catch(() => {
                    console.log("error");
                  });
              }
            }}
            value={username}
            name="username"
            type="text"
            placeholder="Username"
          />
          {requireEmail ? (
            <div className="text-red-600  pl-3">*{error}</div>
          ) : null}
          <input
            autoComplete={"on"}
            className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600"
            onChange={(e) => {
              setEmail(e.target.value);
              setRequireOff();
            }}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
          />

          {requirePassword ? (
            <div className="text-red-600  pl-3">*{error}</div>
          ) : null}
          <input
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600"
            onChange={(e) => {
              setPassword(e.target.value);
              setRequireOff();
            }}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />

          {require_retype_password ? (
            <div className="text-red-600  pl-3">*{error}</div>
          ) : null}
          <input
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600"
            onChange={(e) => {
              setRetypePassword(e.target.value);
              setRequireOff();
              if (e.target.value !== password) setRequirePasswordMatch(true);
              else setRequirePasswordMatch(false);
            }}
            value={retype_password}
            name="retype_password"
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
          />

          {require_country_code || require_mobile_number ? (
            <div className="text-red-600  pl-3">*{error}</div>
          ) : null}
          {require_password_match ? (
            <div className="text-red-600 pl-3">{"password is not same"}</div>
          ) : null}
          <div className="text-left flex">
            <select
              id="phone"
              name="phone"
              className="form-select m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600 w-[35%]"
              value={country_code}
              onChange={(e) => {
                setCountryCode("+" + e.target.value);
                setRequireOff();
              }}
            >
              <option value="">
                {country_code !== "" ? country_code : "code"}
              </option>
              <option value="93">Afghanistan +93</option>
              <option value="358">Aland Islands +358</option>
              <option value="355">Albania +355</option>
              <option value="213">Algeria +213</option>
              <option value="1684">American Samoa +1684</option>
              <option value="376">Andorra +376</option>
              <option value="244">Angola +244</option>
              <option value="1264">Anguilla +1264</option>
              <option value="672">Antarctica +672</option>
              <option value="1268">Antigua and Barbuda +1268</option>
              <option value="54">Argentina +54</option>
              <option value="374">Armenia +374</option>
              <option value="297">Aruba +297</option>
              <option value="61">Australia +61</option>
              <option value="43">Austria +43</option>
              <option value="994">Azerbaijan +994</option>
              <option value="1242">Bahamas +1242</option>
              <option value="973">Bahrain +973</option>
              <option value="880">Bangladesh +880</option>
              <option value="1246">Barbados +1246</option>
              <option value="375">Belarus +375</option>
              <option value="32">Belgium +32</option>
              <option value="501">Belize +501</option>
              <option value="229">Benin +229</option>
              <option value="1441">Bermuda +1441</option>
              <option value="975">Bhutan +975</option>
              <option value="591">Bolivia +591</option>
              <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
              <option value="387">Bosnia and Herzegovina +387</option>
              <option value="267">Botswana +267</option>
              <option value="55">Bouvet Island +55</option>
              <option value="55">Brazil +55</option>
              <option value="246">British Indian Ocean Territory +246</option>
              <option value="673">Brunei Darussalam +673</option>
              <option value="359">Bulgaria +359</option>
              <option value="226">Burkina Faso +226</option>
              <option value="257">Burundi +257</option>
              <option value="855">Cambodia +855</option>
              <option value="237">Cameroon +237</option>
              <option value="1">Canada +1</option>
              <option value="238">Cape Verde +238</option>
              <option value="1345">Cayman Islands +1345</option>
              <option value="236">Central African Republic +236</option>
              <option value="235">Chad +235</option>
              <option value="56">Chile +56</option>
              <option value="86">China +86</option>
              <option value="61">Christmas Island +61</option>
              <option value="672">Cocos (Keeling) Islands +672</option>
              <option value="57">Colombia +57</option>
              <option value="269">Comoros +269</option>
              <option value="242">Congo +242</option>
              <option value="242">
                Congo, Democratic Republic of the Congo +242
              </option>
              <option value="682">Cook Islands +682</option>
              <option value="506">Costa Rica +506</option>
              <option value="225">Cote D'Ivoire +225</option>
              <option value="385">Croatia +385</option>
              <option value="53">Cuba +53</option>
              <option value="599">Curacao +599</option>
              <option value="357">Cyprus +357</option>
              <option value="420">Czech Republic +420</option>
              <option value="45">Denmark +45</option>
              <option value="253">Djibouti +253</option>
              <option value="1767">Dominica +1767</option>
              <option value="1809">Dominican Republic +1809</option>
              <option value="593">Ecuador +593</option>
              <option value="20">Egypt +20</option>
              <option value="503">El Salvador +503</option>
              <option value="240">Equatorial Guinea +240</option>
              <option value="291">Eritrea +291</option>
              <option value="372">Estonia +372</option>
              <option value="251">Ethiopia +251</option>
              <option value="500">Falkland Islands (Malvinas) +500</option>
              <option value="298">Faroe Islands +298</option>
              <option value="679">Fiji +679</option>
              <option value="358">Finland +358</option>
              <option value="33">France +33</option>
              <option value="594">French Guiana +594</option>
              <option value="689">French Polynesia +689</option>
              <option value="262">French Southern Territories +262</option>
              <option value="241">Gabon +241</option>
              <option value="220">Gambia +220</option>
              <option value="995">Georgia +995</option>
              <option value="49">Germany +49</option>
              <option value="233">Ghana +233</option>
              <option value="350">Gibraltar +350</option>
              <option value="30">Greece +30</option>
              <option value="299">Greenland +299</option>
              <option value="1473">Grenada +1473</option>
              <option value="590">Guadeloupe +590</option>
              <option value="1671">Guam +1671</option>
              <option value="502">Guatemala +502</option>
              <option value="44">Guernsey +44</option>
              <option value="224">Guinea +224</option>
              <option value="245">Guinea-Bissau +245</option>
              <option value="592">Guyana +592</option>
              <option value="509">Haiti +509</option>
              <option value="39">Holy See (Vatican City State) +39</option>
              <option value="504">Honduras +504</option>
              <option value="852">Hong Kong +852</option>
              <option value="36">Hungary +36</option>
              <option value="354">Iceland +354</option>
              <option value="91">India +91</option>
              <option value="62">Indonesia +62</option>
              <option value="98">Iran, Islamic Republic of +98</option>
              <option value="964">Iraq +964</option>
              <option value="353">Ireland +353</option>
              <option value="44">Isle of Man +44</option>
              <option value="972">Israel +972</option>
              <option value="39">Italy +39</option>
              <option value="1876">Jamaica +1876</option>
              <option value="81">Japan +81</option>
              <option value="44">Jersey +44</option>
              <option value="962">Jordan +962</option>
              <option value="7">Kazakhstan +7</option>
              <option value="254">Kenya +254</option>
              <option value="686">Kiribati +686</option>
              <option value="850">
                Korea, Democratic People's Republic of +850
              </option>
              <option value="82">Korea, Republic of +82</option>
              <option value="381">Kosovo +381</option>
              <option value="965">Kuwait +965</option>
              <option value="996">Kyrgyzstan +996</option>
              <option value="856">Lao People's Democratic Republic +856</option>
              <option value="371">Latvia +371</option>
              <option value="961">Lebanon +961</option>
              <option value="266">Lesotho +266</option>
              <option value="231">Liberia +231</option>
              <option value="218">Libyan Arab Jamahiriya +218</option>
              <option value="423">Liechtenstein +423</option>
              <option value="370">Lithuania +370</option>
              <option value="352">Luxembourg +352</option>
              <option value="853">Macao +853</option>
              <option value="389">
                Macedonia, the Former Yugoslav Republic of +389
              </option>
              <option value="261">Madagascar +261</option>
              <option value="265">Malawi +265</option>
              <option value="60">Malaysia +60</option>
              <option value="960">Maldives +960</option>
              <option value="223">Mali +223</option>
              <option value="356">Malta +356</option>
              <option value="692">Marshall Islands +692</option>
              <option value="596">Martinique +596</option>
              <option value="222">Mauritania +222</option>
              <option value="230">Mauritius +230</option>
              <option value="262">Mayotte +262</option>
              <option value="52">Mexico +52</option>
              <option value="691">Micronesia, Federated States of +691</option>
              <option value="373">Moldova, Republic of +373</option>
              <option value="377">Monaco +377</option>
              <option value="976">Mongolia +976</option>
              <option value="382">Montenegro +382</option>
              <option value="1664">Montserrat +1664</option>
              <option value="212">Morocco +212</option>
              <option value="258">Mozambique +258</option>
              <option value="95">Myanmar +95</option>
              <option value="264">Namibia +264</option>
              <option value="674">Nauru +674</option>
              <option value="977">Nepal +977</option>
              <option value="31">Netherlands +31</option>
              <option value="599">Netherlands Antilles +599</option>
              <option value="687">New Caledonia +687</option>
              <option value="64">New Zealand +64</option>
              <option value="505">Nicaragua +505</option>
              <option value="227">Niger +227</option>
              <option value="234">Nigeria +234</option>
              <option value="683">Niue +683</option>
              <option value="672">Norfolk Island +672</option>
              <option value="1670">Northern Mariana Islands +1670</option>
              <option value="47">Norway +47</option>
              <option value="968">Oman +968</option>
              <option value="92">Pakistan +92</option>
              <option value="680">Palau +680</option>
              <option value="970">Palestinian Territory, Occupied +970</option>
              <option value="507">Panama +507</option>
              <option value="675">Papua New Guinea +675</option>
              <option value="595">Paraguay +595</option>
              <option value="51">Peru +51</option>
              <option value="63">Philippines +63</option>
              <option value="64">Pitcairn +64</option>
              <option value="48">Poland +48</option>
              <option value="351">Portugal +351</option>
              <option value="1787">Puerto Rico +1787</option>
              <option value="974">Qatar +974</option>
              <option value="262">Reunion +262</option>
              <option value="40">Romania +40</option>
              <option value="7">Russian Federation +7</option>
              <option value="250">Rwanda +250</option>
              <option value="590">Saint Barthelemy +590</option>
              <option value="290">Saint Helena +290</option>
              <option value="1869">Saint Kitts and Nevis +1869</option>
              <option value="1758">Saint Lucia +1758</option>
              <option value="590">Saint Martin +590</option>
              <option value="508">Saint Pierre and Miquelon +508</option>
              <option value="1784">
                Saint Vincent and the Grenadines +1784
              </option>
              <option value="684">Samoa +684</option>
              <option value="378">San Marino +378</option>
              <option value="239">Sao Tome and Principe +239</option>
              <option value="966">Saudi Arabia +966</option>
              <option value="221">Senegal +221</option>
              <option value="381">Serbia +381</option>
              <option value="381">Serbia and Montenegro +381</option>
              <option value="248">Seychelles +248</option>
              <option value="232">Sierra Leone +232</option>
              <option value="65">Singapore +65</option>
              <option value="721">Sint Maarten +721</option>
              <option value="421">Slovakia +421</option>
              <option value="386">Slovenia +386</option>
              <option value="677">Solomon Islands +677</option>
              <option value="252">Somalia +252</option>
              <option value="27">South Africa +27</option>
              <option value="500">
                South Georgia and the South Sandwich Islands +500
              </option>
              <option value="211">South Sudan +211</option>
              <option value="34">Spain +34</option>
              <option value="94">Sri Lanka +94</option>
              <option value="249">Sudan +249</option>
              <option value="597">Suriname +597</option>
              <option value="47">Svalbard and Jan Mayen +47</option>
              <option value="268">Swaziland +268</option>
              <option value="46">Sweden +46</option>
              <option value="41">Switzerland +41</option>
              <option value="963">Syrian Arab Republic +963</option>
              <option value="886">Taiwan, Province of China +886</option>
              <option value="992">Tajikistan +992</option>
              <option value="255">Tanzania, United Republic of +255</option>
              <option value="66">Thailand +66</option>
              <option value="670">Timor-Leste +670</option>
              <option value="228">Togo +228</option>
              <option value="690">Tokelau +690</option>
              <option value="676">Tonga +676</option>
              <option value="1868">Trinidad and Tobago +1868</option>
              <option value="216">Tunisia +216</option>
              <option value="90">Turkey +90</option>
              <option value="7370">Turkmenistan +7370</option>
              <option value="1649">Turks and Caicos Islands +1649</option>
              <option value="688">Tuvalu +688</option>
              <option value="256">Uganda +256</option>
              <option value="380">Ukraine +380</option>
              <option value="971">United Arab Emirates +971</option>
              <option value="44">United Kingdom +44</option>
              <option value="1">United States +1</option>
              <option value="1">United States Minor Outlying Islands +1</option>
              <option value="598">Uruguay +598</option>
              <option value="998">Uzbekistan +998</option>
              <option value="678">Vanuatu +678</option>
              <option value="58">Venezuela +58</option>
              <option value="84">Viet Nam +84</option>
              <option value="1284">Virgin Islands, British +1284</option>
              <option value="1340">Virgin Islands, U.s. +1340</option>
              <option value="681">Wallis and Futuna +681</option>
              <option value="212">Western Sahara +212</option>
              <option value="967">Yemen +967</option>
              <option value="260">Zambia +260</option>
              <option value="263">Zimbabwe +263</option>
            </select>

            <input
              autoComplete={"on"}
              className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600 w-[65%]"
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setRequireOff();
              }}
              value={mobile_number}
              name="mobile_number"
              type="tel"
              maxLength={15}
              placeholder="Mobile Number"
            />
          </div>

          <button
            className="p-3 m-2 border border-slate-800 rounded bg-blue-500 text-white cursor-pointer"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%] mx-auto text-center my-2">
        Already signup?{" "}
        <Link to={"/login"} className="underline font-bold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
