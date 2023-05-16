import React from "react";

const GenreSelection = ({genreChangeHandler}) => {
  return (
    <select
      name=""
      id=""
      className="py-[5px] w-[100px] bg-[#242424] rounded-[5px]"
      onChange={genreChangeHandler}
    >
      <option value="All">All</option>
      <option value="Metal">Metal</option>
      <option value="Rock">Rock</option>
      <option value="Pop">Pop</option>
      <option value="Folk">Folk</option>
      <option value="Hip-Hop">Hip-Hop</option>
      <option value="Jazz">Jazz</option>
      <option value="Electronic">Electronic</option>
      <option value="Ambient">Ambient</option>
      <option value="RnB">RnB</option>
      <option value="Classical">Classical</option>
    </select>
  );
};

export default GenreSelection;
