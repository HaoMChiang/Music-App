import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log("Something went wrong!", err));
  }, [playlistId, spotifyApi]);

  console.log(playlist);

  return (
    <div className="flex-grow overflow-y-scroll h-screen scrollbar-hide">
      <header>
        <div
          className="absolute top-5 right-8 flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img
            src={
              session?.user.image ??
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="w-10 rounded-full"
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 text-white bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
        <img className="h-44 w-44" src={playlist?.images?.[0]?.url} alt="" />
        <div>
          <h1>Playlist</h1>
          <p className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
