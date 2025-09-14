"use client";

import { FC, useEffect, useState } from "react";
import { BiUnlink } from "react-icons/bi";

interface Props {
  initialState?: string;
  onSubmit(link: string): void;
}

const LinkEditForm: FC<Props> = ({ initialState, onSubmit }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialState) setLink(initialState);
  }, [initialState]);

  return (
    <div>
      <div className="absolute top-10 z-50 ring-1 ring-black p-2 rounded flex items-center shadow-sm bg-white outline-none">
        <input
          value={link}
          onChange={({ target }) => setLink(target.value)}
          type="text"
          className="outline-none"
          placeholder="https://url.com"
        />
        <button
          onMouseDown={() => {
            onSubmit(link);
          }}
          className="bg-black text-white w-8 aspect-square flex justify-center items-center"
        >
          ok
        </button>
        <button
          onMouseDown={() => {
            onSubmit("");
          }}
          className="bg-red-400 text-white w-8 aspect-square flex justify-center items-center"
        >
          <BiUnlink />
        </button>
      </div>
    </div>
  );
};

export default LinkEditForm;
