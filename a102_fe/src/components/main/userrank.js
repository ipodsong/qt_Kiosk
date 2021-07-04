/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";

function Userrank() {
  let [userRank, setUserRank] = useState([]);

  useEffect(() => {
    // fetch("http://i4a102.p.ssafy.io:8080/app/main/userrankbowl")
    fetch(`${process.env.REACT_APP_API_URL}/main/userrankbowl`)
      .then((res) => res.json())
      .then((users) => {
        setUserRank(users);
      });
  }, []);

  return (
    <div className="userrank carouselItem d-flex flex-column align-items-center justify-content-center">
      {userRank.map((user, index) => {
        if (index >= 3) {
          return;
        }
        return (
          <div key={index}>
            <h5 className="userrankrank">
              {index + 1}등 {user.userName}
            </h5>
            <h5 className="userrankgood">
              총 {user.userTotalContributionCount}그릇 후원해준 {user.userName}
              님 멋쟁이~!~!
            </h5>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Userrank;
