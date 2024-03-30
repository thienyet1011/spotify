import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

import { postData } from "@/libs/helpers";

import Button from "@/components/Button";

const AccountContent = () => {
    const router = useRouter();
    const subscriberModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            return router.replace("/");
        }
    }, [isLoading, router, user]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url } = await postData({
                url: '/api/create-portal-link',
            });

            window.location.assign(url);
        } catch (err) {
            if (err) {
                toast.error((err as Error).message);
            }
        }

        setLoading(false);
    };

    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan</p>
                    <Button
                        className="w-[300px]"
                        onClick={subscriberModal.onOpen}
                    >
                        Subscribe
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are currenlty on the <b>{subscription?.price?.products?.name}</b> plan.
                    </p>
                    <Button
                        className="w-[300px]"
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                    >
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
    );
};
 
export default AccountContent;