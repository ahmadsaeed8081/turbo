import React from "react";

const CardDetail = ({ setOpen }) => {
  return (
    <div className="card-detail flex">
      <div className="card-wrapper flex flex-col">
        <div className="card-hdr flex items-center justify-end">
          <div className="btn-back" onClick={(e) => setOpen(false)}>
            Go Back
          </div>
        </div>
        <div className="meta flex flex-col">
          <div className="status-sec flex items-center justify-between">
            <div className="lbl">Level 1</div>
            <div className="lbl">T2</div>
          </div>
          <div className="card-boxes flex justify-center items-center">
            <div className="inner-box flex">
              <div className="circle-branches rel flex items-center">
                <div className="circle"></div>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
                <div className="line4"></div>
              </div>
              <div className="small-boxes flex rel items-center">
                <div className="s-box"></div>
                <div className="s-box"></div>
                <div className="s-box"></div>
                <div className="s-box"></div>
              </div>
            </div>
          </div>
          <div className="info-sec flex items-center justify-between">
            <div className="info-item flex flex-col">
              <div className="lbl">Partners</div>
              <div className="val">141</div>
            </div>
            <div className="info-item flex flex-col">
              <div className="lbl">Cycles</div>
              <div className="val">141</div>
            </div>
          </div>
          <div className="profit-sec flex items-center justify-between">
            <div className="info-item flex flex-col">
              <div className="lbl">Net Profit Per-Cycle</div>
              <div className="val">5.00 USDT</div>
            </div>
          </div>
          <div className="revenue-sec flex items-center justify-between">
            <div className="info-item flex flex-col">
              <div className="lbl">Total Level Revenue</div>
              <div className="val">705.00 USDT</div>
            </div>
          </div>
          <div className="action flex items-center justify-center">
            <div className="btn">View NFT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
