import { BsFillShieldLockFill, BsFillTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import './Signup.css'

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="SignupOuterContainer">

      <div className="SignupMainContainer">

        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2>
            👍Login Success
          </h2>
        ) : (
          <div >
            {showOTP ? (
              <div className="OtpMaincontainer">
                <div className="ShieldIcon">
                  <span><BsFillShieldLockFill size={30} /></span>
                </div>
                <label
                  htmlFor="otp"
                >
                  <h3>Enter your OTP</h3>
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className=""
                ></OtpInput>
                <button className="VerifyButton"
                  onClick={onOTPVerify}
                >
                  {loading && (
                    <CgSpinner size={20}  />
                  )}
                  <span>Verify OTP</span>
                </button>
              </div>
            ) : (
              <div className="PhoneMainContainer">
                
                <div className="PhoneIcon">
                  <span><BsFillTelephoneFill size={30}/></span>
                </div>
                
                  <h3 className="VerifyText">Verify your phone number </h3>
                <PhoneInput  country={"in"} value={ph} onChange={setPh} placeholder="" className="PhoneInput"/>
                <button className="SignupSendButton"
                  onClick={onSignup}
                >
                  {loading && (
                    <CgSpinner size={20}  />
                  )}
                  <span>Send code via SMS</span>
                </button>
                  
              </div>
            )}
          </div>
        )}
      </div>
      </div>
  );
};

export default App;