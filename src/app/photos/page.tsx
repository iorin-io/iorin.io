import { client } from '@/lib/client';
import { AlbumType, PhotoType } from '@/types/types';
import PhotoPageClient from './PhotoPageClient';

export default async function PhotoPage() {
	try{
		const photos = await client.get({ endpoint: 'photos'});
		const album = await client.get({ endpoint: 'album'});

		const photosContents = photos.contents as PhotoType[];
		const albumContents = album.contents as AlbumType[];

		return (
			<PhotoPageClient photos={photosContents} album={albumContents} />
		);
	} catch (error) {
		console.error('Error fetching photos', error);
		throw error;
	}
}