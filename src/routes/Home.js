import { dbService } from "fbinstance";
import React, { useEffect, useState } from "react";
import Chaweet from "components/Chaweet";

const Home = ({ userObj }) => {
  const [chaweet, setChaweet] = useState("");
  const [chaweets, setChaweets] = useState([]);

  useEffect(() => {
    dbService.collection("chaweets").onSnapshot((snapshot) => {
      const chaweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChaweets(chaweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("chaweets").add({
      text: chaweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setChaweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setChaweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={chaweet}
          onChange={onChange}
          maxLength={120}
        />
        <input type="file" accept="image/*" />
        <input type="submit" value="Chaweet" />
      </form>
      <div>
        {chaweets.map((chaweet) => (
          <Chaweet
            key={chaweet.id}
            chaweetObj={chaweet}
            isOwner={chaweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
