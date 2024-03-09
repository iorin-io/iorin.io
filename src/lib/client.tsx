import { createClient } from "microcms-js-sdk";
import { PhotoType, AlbumType } from "@/types/types";

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
    console.log(process.env.NEXT_PUBLIC_MICROCMS_API_KEY);
    throw new Error('API_KEYが設定されていません。');
}

export const client = createClient({
    serviceDomain: 'iorin-io',
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

export const fetchPicture = async () => {
    try {
        return await client.get<PhotoType[]>({ endpoint: 'photos' });
    } catch (error) {
        console.error('Error fetching picture', error);
        throw error;
    }
}

export const fetchAlbum = async () => {
    try {
        return await client.get<AlbumType[]>({ endpoint: 'album' });
    } catch (error) {
        console.error('Error fetching album', error);
        throw error;
    }
}