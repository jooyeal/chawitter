import { dbService } from "fbinstance";
import React, { useState } from "react";

const Chaweet = ({ chaweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChaweet, setNewChaweet] = useState(chaweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete?");
    if (ok) {
      await dbService.doc(`chaweets/${chaweetObj.id}`).delete();
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`chaweets/${chaweetObj.id}`).update({
      text: newChaweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChaweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              placeholder="Edit your chaweet"
              value={newChaweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Chaweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{chaweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Chaweet</button>
              <button onClick={toggleEditing}>Edit Chaweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chaweet;
