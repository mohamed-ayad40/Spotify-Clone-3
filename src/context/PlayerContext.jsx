import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
export const PlayerContext = createContext();
const PlayerContextProvider = ({children}) => {
  return (
        <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>
  )
}

export default PlayerContextProvider;