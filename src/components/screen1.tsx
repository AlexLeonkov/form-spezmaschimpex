import React from "react";




function Screen1({ onClick }: any) {
  return (
    <div className="form-row">
      <div onClick={onClick} className="item">
      <img src="../solar.png"></img>
      Panel
      </div>
      <div onClick={onClick} className="item">
      <img src="../solar.png"></img>
      Speicher
      </div>
      <div onClick={onClick} className="item">
      <img src="../solar.png"></img>
      Warmpump
      </div>
    </div>
  );
}

export default Screen1;
