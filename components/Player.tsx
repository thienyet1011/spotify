import { useGetSongById } from "@/hooks/useGetSongById";
import { useLoadSong } from "@/hooks/useLoadSong";
import { usePlayer } from "@/hooks/usePlayer";

const Player = async () => {
    const player = usePlayer();
    const { song } = await useGetSongById(player.activeId);

    const songUrl = useLoadSong(song!);

    // if (!song || !songUrl || !player.activeId) {
    //     return null;
    // }

    return (
        <div>
            
        </div>
    );
};
 
export default Player;