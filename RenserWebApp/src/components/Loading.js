import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <Oval
        height={60}
        width={60}
        color="pink"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="pink"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </div>
  );
};

export default Loading;
