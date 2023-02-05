import {useState, useContext } from "react";
import {UserContext} from "../context";
import axios from "axios";

const Search = () => {
    const [state] = useContext(UserContext);

    const [query, setQuery] =  useState("");

    const searchUser = async(e) => {
        e.preventDefault();
        //console.log(`Find"${query}" f rom db`);
        try{
            const{data} = await axios.get(`/search_user/${query}`);
            console.log("search user response => ", data);
        }catch(err){
            console.log(err)
        }
    };

    return (
        <>
            <form className="form-inline row" onSubmit={searchUser}>
                <div className="col-8">
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        className="form-control"
                        type="search"
                        placeholder="Search"
                    />
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-outline-primary col-12"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </form>
        </>
    );
};

export default Search;