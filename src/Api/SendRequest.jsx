import axios from "axios";

export const backendUrl = import.meta.env.MODE === "development" 
    ? "http://localhost:4000" 
    : "https://spotify-clone-server-tau.vercel.app";

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
});
// باقي الكود بتاع الـ api requests زي ما هو بالظبط...

// export const signInWithGoogle = async (data) => {
//     try {
//         const response = await fetch(`${url}/api/user/addGoogleUser`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
//         const results = response.json();
//         console.log(results);
//         return results;
//     } catch (err) {
//         console.log(err);
//     }
// };



export const signIn = async (payload) => {
    try {
        const response = await api.post("/api/user/login", payload); 
        const secondResponse = await api.get("/");
        return response.data.user;
        
    } catch (err) {
        // console.log("error occure: "+ err);
        return err.message || err;
    };
};


export const signUp = async (payload) => {
    try {
        const response = await api.post(`/api/user/signup`, payload);
        // console.log(response);
        return response
    } catch (err) {
        // console.log("error occure: "+ err); 
        return err.message || err;
    };
};

export const getcurrentSong = async () => {
    try {
        const response = await api.get("/api/song/playing-song");

        return response;
    } catch (err) {
        console.log("Mistake");
    };
};

export const updateCurrentSong = async (payload) => {
    try {
        // console.log(payload);
        const response = await api.post("/api/song/playing-song", payload);
        // console.log(response);
        return response;
    } catch (err) {
        console.log("Mistake");
    };
};