import React, { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import * as ReactBootStrap from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./spinner";

const UsePullRequest = () => {
  const [state, setState] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  //Styling
  const divStyle = {
    marginLeft: "10px",
    marginRight: "10px",
  };

  //fetching all pull requests from base_url
  const listOfRequests = async () => {
    const result = await fetch(
      process.env.REACT_APP_BASE_URL + `&page=1&per_page=100&limit=400`,
      {
        method: "get",
        headers: {
          Authorization: "token" + process.env.REACT_APP_ACCESS_TOKEN,
        },
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
      process.env.REACT_APP_BASE_URL + `&page=${page}&per_page=100&limits=400`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const prevData = await fetchList();
    console.log("Printing :", prevData.length);
    setState([...state, ...prevData]);
    if (prevData.length === 0) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  //mapping list into table
  const pullRequests =
    state.length !== 0
      ? state.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td className="text-capitalize">{item.base.repo.default_branch}</td>
            <td className="text-center">-</td>
            <td>{item.head.user.login}</td>
            <td>{item.created_at}</td>
            <td className="text-center">-</td>
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
        dataLength={state.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="shadow p-3 mb-5 bg-white rounded" style={divStyle}>
          <ReactBootStrap.Table striped bordered hover responsive>
            <thead>
              <tr style={{
                            backgroundColor: 'black',
                            color: "white"
                        }}>
                <th className="text-center">S.No</th>
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