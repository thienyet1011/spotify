import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSongs } from "./getSongs";

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    if (!title) {
        return getSongs();
    }

    console.log('title', title);
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(`GET_SONGS_BY_TITLE:: ${error}`);
    }

    return (data as any) || [];
};