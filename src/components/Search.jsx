import React, { useContext, useEffect, useState } from 'react'
import SongItem from './SongItem';
import Navbar from "./Navbar";
import { PlayerContext } from '../context/PlayerContext';

const Search = () => {
    const [search, setSearch] = useState("");
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    const handleFilterClick = (filterValue) => {
        setSelectedFilter(filterValue);
    };
    const mainInfo = useContext(PlayerContext);
    const selectedSongId = mainInfo.track?._id;
    const data = mainInfo.songsData;
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const filters = [
        { label: 'All', value: 'all' },
        { label: "Artists", value: "artists" },
        { label: 'Songs', value: 'songs' },
        { label: "Playlists", value: "playlists" },
        { label: 'Podcasts', value: 'podcasts' },
        { label: "Genres & Modes", value: "genres & mode" },
        { label: "Profiles", value: "profiles" }
    ];

    useEffect(() => {
        const filteredData = data.filter((item) => {
            if (selectedFilter === 'all') return true;
            if (selectedFilter === 'songs') return item.type === 'songs';
            if (selectedFilter === 'podcasts') return item.type === 'podcasts';
            return false;
        });
        const filteredSongs = search ? filteredData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : filteredData;
        setFilteredSearch(filteredSongs);
    }, [search, selectedFilter, data]);


    return (
        <div className='w-min-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Navbar searchTerm={search} setSearchTerm={setSearch} handleInputChange={handleInputChange} />
        <nav className='flex items-center gap-2 mt-4'>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                    className={`${filter.value === selectedFilter ? 'active' : ''} bg-black px-4 py-1 rounded-2xl cursor-pointer`}
                >
                    {filter.label}
                </button>
            ))}
        </nav>
        
        <div className='flex flex-wrap'>
            {search && (
                <>
                    <h1 className='font-bold text-[24px] my-5'>{selectedFilter.toUpperCase()}</h1>
                    {filteredSearch?.map((item, index) => {
                        return (
                        <div key={index} className={`w-full flex flex-wrap rounded h-16 hover:bg-[#ffffff26] items-center cursor-context-menu ${selectedSongId === item._id && "bg-[#ffffff26] "}`}>
                            <SongItem key={index} name={item.name} image={item.image} desc={item.desc} id={item._id} />
                        </div>
                        )
                    })}

                </>
            )}
        </div>
    </div>
    )
}

export default Search