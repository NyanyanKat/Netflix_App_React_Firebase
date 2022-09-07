import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../axiosHook/axiosHook";
// import axios from "axios";
import "./home.scss";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`
          // {
          //   headers: {
          //     token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTQzOWU1ZTBhOGNlNDM5YjJlOWE5YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjI3MDM3NCwiZXhwIjoxNjYyNzAyMzc0fQ.kEj8-E50ZsDa_YLglfxvQtfP00A8sSbU3H6CBMhx2ro`,
          //   },
          // }
        );
        // console.log(res);
        setLists(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists?.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
