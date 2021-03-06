
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import CharacterItem from "./CharacterItem";
import { useDispatch } from "react-redux";

const Home = () => {
    const [items, setitems] = useState([]);
    // const [hasMore, sethasmore] = useState(true);
    const [offset, setpage] = useState(8);
    const dispatch = useDispatch();

    const url = `https://gateway.marvel.com/v1/public/characters?ts=1639565090520&apikey=2e607457520c8e2f33d5fcc111a7c5bd&hash=e9c1a52bbeabe52ed4f5c0b402f02f15&limit=8&offset=`

    useEffect(() => {
        const getComments = async (dispatch) => {
            const result = await axios({url})
            
            console.log("result", result.data.data.results);
            setitems(result.data.data.results);
            // sethasmore(false);
            dispatch({ type: "SHOW_DATA", payload: result.data.data.results })
        };
        getComments();
    }, []);

    const fetchComments = async () => {
        const res = await axios(
            `https://gateway.marvel.com/v1/public/characters?ts=1639565090520&apikey=2e607457520c8e2f33d5fcc111a7c5bd&hash=e9c1a52bbeabe52ed4f5c0b402f02f15&limit=20&offset=${offset}`
        );
        const data = res;
        console.log("data", data);
        
            dispatch({ type: "SHOW_DATA", payload: res.data.data.results })
             return data;
    };
    const fetchData = async () => {
        const commentsFormServer = await fetchComments();
        setitems([...items, ...commentsFormServer.data.data.results]);
        console.log("commentsFormServer", items);
        if (commentsFormServer.length === 0 || commentsFormServer.length > 20) {
            // sethasmore(false);
        }
        setpage(offset + 8);
        dispatch({ type: "LOAD_DATA", payload: items })
    };

    return (
        <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<Loader />}
        >
            <div className="container">
                <div className="row m-2">
                    {
                    items.map((item) => {
                        return <CharacterItem key={item.id} item={item} />;
                    })
                    }
                </div>
            </div>
        </InfiniteScroll>
    );
};

export default Home;