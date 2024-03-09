'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Image from 'next/image';
import { PhotoType, AlbumType } from '@/types/types';

export default function PhotoPageClient({ photos, album }: { photos: PhotoType[], album: AlbumType[] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('all');
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const modalRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const validImageRefs = imageRefs.current.filter(ref => ref !== null);
        if (validImageRefs.length > 0) {
            gsap.killTweensOf(validImageRefs);
            gsap.fromTo(validImageRefs,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.5,
                }
            );
        }
    }, [selectedAlbum]);

    useEffect(() => {
        if (modalRef.current) {
            gsap.killTweensOf(modalRef.current);
            if (showModal) {
                gsap.fromTo(modalRef.current,
                    { autoAlpha: 0, y: 100 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                    }
                );
            } else {
                gsap.to(modalRef.current,
                    {
                        autoAlpha: 0,
                        y: 100,
                        duration: 0.8,
                    }
                );
            }
        }
    }, [showModal]);

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
        setShowModal(true);
    };


    return (
<>
		<main>
			<div>
			<div>
				{photos.map((photo: PhotoType, index: number) => (
				<div key={photo.id} ref={el => imageRefs.current[index] = el}>
					<div onClick={() => handleImageClick(photo.photo.url)}>
					    <Image src={photo.photo.url} alt={photo.caption} width={500} height={500} />
						<span>{photo.caption}</span>
					</div>
				</div>
				))}

			</div>
			</div>
		</main>
		</>
    );
}
