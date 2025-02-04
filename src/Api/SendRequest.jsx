import axios from "axios";

// let url = "https://spotify-clone-server-tau.vercel.app"
let url = "http://localhost:4000";

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

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    
});

export const signIn = async (payload) => {
    try {
        const response = await api.post("/api/user/login", payload); 
        console.log(response);
        const secondResponse = await api.get("/");
        console.log(secondResponse);
        return response.data.user;
        
    } catch (err) {
        console.log(err)
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
        console.log(err);
        return err.message || err;
    };
};

export const getcurrentSong = async () => {
    try {
        const response = await api.get("/api/song/playing-song");
        console.log("before PLAYING SONG RESPONSE")
        console.log(response);
        console.log(" after PLAYING SONG RESPONSE")
        return response;
    } catch (err) {
        console.log(err);
    };
};

export const updateCurrentSong = async (payload) => {
    try {
        // console.log(payload);
        const response = await api.post("/api/song/playing-song", payload);
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    };
};