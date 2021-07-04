import React, { useState, useEffect } from "react";
// import happynew from "../../assets/images/happynew.png"


function Usertotal() {
    const [userTotal, setUserTotal] = useState(0);
  
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/main/usertotal`)
        .then((res) => res.json())
        .then((total) => {
          setUserTotal(total);
        });
    }, [])
  
    return(
      <div className="usertotal carouselItem">
        <br/>
        <h3 className="usertotaltotal">지금까지 총 후원된 금액은 { userTotal }원입니다.</h3>
        <br/>
        <h4 className="usertotaltotal">따뜻한 마음의 멋쟁이 여러분 감사합니다!</h4>
      </div>
    );
}

export default Usertotal;