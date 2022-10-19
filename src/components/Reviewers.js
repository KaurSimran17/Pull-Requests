import React, { useState, useEffect } from "react";

const Reviewers = (props) => {
  const number = props.number;
  const [review, setReviewers] = useState([]);

  const listOfNumbers = async () => {
    const fetchNumber = await fetch(
      process.env.REACT_APP_REVIEW_URL + `${number}/reviews`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );
    const list = await fetchNumber.json();
    const uniqueNames = new Set();
    for (var i = 0; i < list.length; i++) {
      uniqueNames.add(list[i].user.login);
    }
    const reviewerNames = [...uniqueNames];

    setReviewers(reviewerNames);
  };

  const output = review.map((i, index) => {
    return <li key={index}>{i}</li>;
  });

  useEffect(() => {
    listOfNumbers();
  }, []);

  return <>{output}</>;
};

export default Reviewers;