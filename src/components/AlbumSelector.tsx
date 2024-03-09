import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { AlbumSelectorProps } from '@/types/types';

const AlbumSelector: React.FC<AlbumSelectorProps> = ({ album, selectedAlbum, setSelectedAlbum }) => {
    return (
        <header>
            <FormControl>
                <InputLabel htmlFor="album-native-select">Select Album</InputLabel>
                <NativeSelect
                    value={selectedAlbum}
                    onChange={(e) => setSelectedAlbum(e.target.value)}
                    inputProps={{
                        name: 'album',
                        id: 'album-native-select',
                    }}
                >
                    <option value="all">All</option>
                    {album.map((alb, index) => (
                        <option key={index} value={alb.name}>
                            {alb.name}
                        </option>

                    ))}
                </NativeSelect>
            </FormControl>
        </header>
    );
};

export default AlbumSelector;