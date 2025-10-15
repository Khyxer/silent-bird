// Contexto para manejar la creacion de un nuevo post

import { createContext, useState } from "react";

const NewPostContext = createContext();

export const NewPostProvider = ({ children }) => {
    const [formNewPostData, setFormNewPostData] = useState({
        content: "",
        images: [],
        taggedUsers: [],
        hashtags: [],
    });
    return (
        <NewPostContext.Provider value={{formNewPostData, setFormNewPostData}}>
            {children}
        </NewPostContext.Provider>
    );
};

export default NewPostContext;
