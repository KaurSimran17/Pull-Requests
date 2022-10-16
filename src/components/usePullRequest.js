import React, { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import * as ReactBootStrap from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./spinner";

const UsePullRequest = () => {
  const [state, setState] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  // const [reviewer, setReviewers] = useState([]);


  //Styling
  const divStyle = {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  };



  //fetching all pull requests from base_url
  const listOfRequests = async () => {
    const result = await fetch(
      process.env.REACT_APP_BASE_URL + `&per=1&per_page=100&limit=30`,
      {
        method: 'get',
        headers: {
          'Authorization': 'token' + process.env.REACT_APP_ACCESS_TOKEN
        }
      }
    );
    const list = await result.json();
    console.log(list);
    setState(list);
  };

  useEffect(() => {
    listOfRequests();
  }, []);


  //fetching pull request from next page
  const fetchList = async () => {
    const res = await fetch(
      process.env.REACT_APP_BASE_URL + `&per=${page}&per_page=100&limit=30`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const prevData = await fetchList();
    setState([...state, ...prevData]);
    if (prevData.length === 0 || prevData.length < 400) {
      setHasMore(false);
      console.log("Printing");
    }
    setPage(page + 1);
  };

  //mapping list into table
  const pullRequests =
    state.length !== 0
      ? state.map((item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td className="text-capitalize">{item.base.repo.default_branch}</td>
            <td>-</td>
            <td>{item.head.repo.owner.login}</td>
            <td>{item.base.repo.created_at}</td>
            <td>-</td>
            <td>
              {item.labels.map((index) => {
                return <li key={index.id}>{index.name}</li>;
              })}
            </td>
            <td>
              <a href={item.html_url}>
                <FaGithubSquare />
              </a>
            </td>
          </tr>
        ))
      : console.log("No Pull Requests Found");

  return (
    <>
      <InfiniteScroll
        dataLength={state.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="shadow p-3 mb-5 bg-white rounded" style={divStyle}>
          <ReactBootStrap.Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th className="text-center">Title</th>
                <th className="text-nowrap text-center">Base Branch</th>
                <th className="text-nowrap text-center">Author Branch</th>
                <th className="text-center">Author</th>
                <th className="text-nowrap text-center">Created On</th>
                <th className="text-center">Reviewers</th>
                <th className="text-center">Labels</th>
                <th className="text-center">URL</th>
              </tr>
            </thead>
            <tbody>{pullRequests}</tbody>
          </ReactBootStrap.Table>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default UsePullRequest;
