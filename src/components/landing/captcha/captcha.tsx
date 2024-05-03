import React, { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";

const CaptchaTest: React.FC<{ onCaptchaChange: (value: string) => void }> = ({
  onCaptchaChange,
}) => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div className="w-[16rem]">
      <div className="container">
        <div className="form-group">
          <div className="col mt-2 border-2 bg-white rounded-lg p-2 shadow-md border-formGray">
            <LoadCanvasTemplate />
          </div>
          <div className="col mt-3">
            <input
              placeholder="Enter Captcha Value"
              name="user_captcha_input"
              type="text"
              onChange={(e) => onCaptchaChange(e.target.value)}
              className="shadow bg-formGray border-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline-none mb-3"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptchaTest;