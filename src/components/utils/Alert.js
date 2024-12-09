import React from "react";

function Alert(props) {
    const {alertData} = props;

  return (
    <>
      <div
          className={`fixed top-0 right-0 left-0 p-4 text-sm text-gray-800 ${alertData.type === "success" ?"bg-green-300":alertData.type === 'warning' ? 'bg-yellow-300':'bg-red-300'} `}
          role="alert"
        >
          <span className="font-medium">{alertData.title}!</span> 
          {" " + alertData.message}
        </div>
    </>
  );
}

export default Alert;
