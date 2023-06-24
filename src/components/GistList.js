import React, { useEffect, useState, useContext } from "react";
import { getGistForUser, getPublicGists } from "../services/gistService";
import "./style.css";
import moment from "moment/moment";

const GistList = ({ userSearch }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [gistuser, setGistuser] = useState([]);
  console.log(userSearch);

  useEffect(() => {
    setIsLoading(true);
    getPublicGists()
      .then((res) => {
        setGistuser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const id = setTimeout(
      () => {
        setIsLoading(true);
        setFirstLoad(false);
        if (!userSearch) {
          getPublicGists()
            .then((res) => {
              setGistuser(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          getGistForUser(userSearch)
            .then((res) => {
              setGistuser(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      },
      firstLoad ? 0 : 1000
    );
    return () => {
      clearTimeout(id);
    };
  }, [userSearch]);

  return (
    <div className="main_div">
      {isLoading ? (
        <div className="loader">
          <img alt="loader" src="assets/loader.svg" />
        </div>
      ) : !gistuser.length && !firstLoad ? (
        <div className="loader">
          <h1>No Gist Found</h1>
        </div>
      ) : (
        gistuser?.map((row) => (
          <div key={row?.id} className="gist_box">
            <div className="upper_content">
              <div className="avatar_name">
                <img
                  alt="avatar"
                  src={row?.owner?.avatar_url}
                  className="person_avatar"
                />
                <span>{row?.owner?.login}</span>
              </div>
              <div className="gist_details">
                <img
                  alt="files"
                  src="assets/coding.png"
                  width={20}
                  height={20}
                />
                <span>Files</span>
                <img
                  alt="forks"
                  src="assets/fork.png"
                  width={20}
                  height={20}
                />{" "}
                <span>Forks</span>
                <img
                  alt="comments"
                  src="assets/comment.png"
                  width={20}
                  height={20}
                />{" "}
                <span>Comments</span>
                <img
                  alt="stars"
                  src="assets/star.png"
                  width={20}
                  height={20}
                />{" "}
                <span>Stars</span>
              </div>
            </div>
            <div className="lower_content">
              <span>
                {" "}
                {`Created at: ${moment(row?.created_at).format("L")} `}
              </span>
              <span>
                {" "}
                {` Last updated: ${moment(row?.updated_at).format("L")}`}
              </span>
              <p>{row?.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GistList;
