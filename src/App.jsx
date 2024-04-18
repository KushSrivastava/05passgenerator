import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [passwordlength, setpasswordlength] = useState(8);
  const [charAllowed, setcharAllowed] = useState(false);
  const [numberallowed, setnumberallowed] = useState(false);
  const [password, setpassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKLOP";

    if (numberallowed) str += "023456789";
    if (charAllowed) str += "!@#$%^&*()_+/.,';][";

    for (let i = 0; i < passwordlength; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [passwordlength, numberallowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [passwordlength, numberallowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordref.current.select();
  };

  const passwordref = useRef(null);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordref}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={8}
          max={20}
          value={passwordlength}
          className="cursor-pointer"
          onChange={(e) => setpasswordlength(e.target.value)}
          name=""
          id=""
        />
        <label htmlFor="passwordlength">Length : {passwordlength}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          name=""
          id=""
          defaultChecked={numberallowed}
          onChange={() => {
            setnumberallowed((prevvalue) => !prevvalue);
          }}
        />
        <label htmlFor="number">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          name=""
          id=""
          defaultChecked={charAllowed}
          onChange={() => {
            setcharAllowed((prevvalue) => !prevvalue);
          }}
        />
        <label htmlFor="charInputr">Charaters</label>
      </div>
    </div>
  );
}

export default App;
