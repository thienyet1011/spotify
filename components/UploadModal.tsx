"use client";

import { useState } from "react";
import {
FieldValues,
SubmitHandler,
useForm
} from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import toast from "react-hot-toast";
import uniqid from "uniqid";

import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

import { useUploadModal } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const uploadModal = useUploadModal();

    const { user } = useUser();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const _uploadImage = async (uniqueID: string, title: string, imageFile: File) => {
        const { data, error } = await supabaseClient
            .storage
            .from("images")
            .upload(`image-${title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            });
            
        return { data, error };
    };

    const _uploadSong = async (uniqueID: string, title: string, songFile: File) => {
        const { data, error } = await supabaseClient
            .storage
            .from("songs")
            .upload(`song-${title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
            });

        return { data, error };
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error("Missing fields");
            }

            const uniqueID = uniqid();

            //#region Upload song
            const {
                data: songData,
                error: songError,
            } = await _uploadSong(uniqueID, values.title, songFile);

            if (songError) {
                setIsLoading(false);
                return toast.error("Failed song upload");
            }
            //#endregion

            //#region Upload image
            const {
                data: imageData,
                error: imageError,
            } = await _uploadImage(uniqueID, values.title, imageFile);

            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed image upload");
            }
            //#endregion

            //#region Create song
            const {
                error: insertError
            } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user?.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData?.path,
                    song_path: songData?.path,
                });

            if (insertError) {
                setIsLoading(false);
                return toast.error(insertError.message);
            }
            //#endregion

            router.refresh();
            setIsLoading(false);
            toast.success("Song created");
            reset();
            uploadModal.onClose();
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song title"
                />

                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder="Song author"
                />

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", { required: true })}
                    />
                </div>

                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", { required: true })}
                    />
                </div>

                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;