import axios from "axios";

let url = "http://localhost:4000"
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
    }
});

export const signIn = async (payload) => {
    try {
        const response = await api.post("/api/user/login", payload); 
        console.log(response);
        return response.data.user;
        
    } catch (err) {
        console.log(err)
        console.log("error occure: "+ err);
        return err.message || err;
    };
};


export const signUp = async (payload) => {
    try {
        const response = await api.post(`/api/user/signup`, payload);
        console.log(response);
        return response
    } catch (err) {
        console.log("error occure: "+ err); 
        console.log(err);
        return err.message || err;
    };
};

export const getcurrentSong = async () => {
    try {
        const response = await api.get("/api/song/playing-song");
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    };
};

export const updateCurrentSong = async (payload) => {
    try {
        const response = await api.post("/api/song/playing-song", payload);
        return response;
    } catch (err) {
        console.log(err);
    };
};