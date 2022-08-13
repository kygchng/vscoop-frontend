import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Select from 'react-select'
//import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({roomList}) => {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {
        setSelectedOptions(roomList);
    }, [])

    const handleChange = (e) => {
        setValue({value: e});
        var roomId = e.roomId;
        localStorage.setItem("roomIdStr", roomId);
        router.push("/room")
        console.log(e);

    }

    console.log(roomList);
    return (
        <div>
            <Select options = {selectedOptions} placeholder = "Search for rooms" onChange = {handleChange}/>
        </div>
    )
}

export default SearchBar;