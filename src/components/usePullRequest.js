import React, { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import * as ReactBootStrap from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const UsePullRequest = () => {
  const [state, setState] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  const divStyle = {
    width: "85%",
    marginLeft:"auto" , 
    marginRight:"auto"
  }
  const listOfRequests = async () => {
    const result = await fetch(
      `https://api.github.com/repos/neovim/neovim/pulls?state=all&per=1&per_page=100&limit=30`
    );
    const list = await result.json();
    console.log(list);
    setState(list);
    // console.log(result.data);
  };

  useEffect(() => {
    listOfRequests();
  }, []);

  const fetchList = async () => {
    const res = await fetch(
      `https://api.github.com/repos/neovim/neovim/pulls?state=all&per=${page}&per_page=100&limit=30`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const prevData = await fetchList();
    setState([...state, ...prevData]);
    if (prevData.length === 0 || prevData.length < 400) {
      sethasMore(false);
      console.log("Printing");
    }
    setpage(page + 1);
  };

  const pullRequests =
    state.length !== 0
      ? state.map((item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.base.repo.default_branch}</td>
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
        loader={"Loading..."}
      >
        <div className="shadow-sm p-3 mb-5 bg-white rounded" style={divStyle}>
        <ReactBootStrap.Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th className="text-nowrap">Base Branch</th>
              <th className="text-nowrap">Author Branch</th>
              <th>Author</th>
              <th className="text-nowrap">Created On</th>
              <th>Reviewers</th>
              <th>Labels</th>
              <th>URL</th>
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
