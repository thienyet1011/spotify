import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLikedSongs = async ():  Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const {
        data: sessionData,
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(`GET_LIKED_SONGS_WITHOUT_SESSION:: ${JSON.stringify(sessionError)}`);
    }

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(`GET_LIKED_SONGS:: ${JSON.stringify(error)}`);
        return [];
    }

    if (!data) {
        return [];
    }

    return data.map((item) => ({
        ...item.songs
    }));
};