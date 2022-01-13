import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  console.log("Songs: ", playlist?.tracks?.items);
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks?.items
        .filter((track) => track?.track !== null)
        .map((newTrack, i) => (
          <Song key={newTrack?.track?.id} track={newTrack} order={i} />
        ))}
    </div>
  );
}

export default Songs;
