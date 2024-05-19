"use client";

import { useEffect } from "react";

import TagManager, { TagManagerArgs } from "react-gtm-module";

interface GoogleTagProviderProps {
    children: React.ReactNode;
}

const GoogleTagProvider: React.FC<GoogleTagProviderProps> = ({
    children
}) => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
    const tagManagerArgs: TagManagerArgs = {
        gtmId
    };

    useEffect(() => {
        TagManager.initialize(tagManagerArgs);
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default GoogleTagProvider;