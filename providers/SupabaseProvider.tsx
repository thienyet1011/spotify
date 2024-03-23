"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import { Database } from "@/type_db";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
    children,
}) => {
    const [supabaseClient] = useState(() => 
        createClientComponentClient<Database>()
    );

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
};

export default SupabaseProvider;