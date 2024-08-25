/** @format */

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "./store";

type socketType = {
    socket: Socket<any> | null;
};

const initialState: socketType = {
    socket: null,
};

export const SocketContext = createContext(initialState);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket<any> | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        let socketIo: Socket | null = null; // Ensure proper socket instance handling

        if (user) {
            socketIo = io(import.meta.env.VITE_API_SOCKET, {
                query: {
                    userId: user._id,
                },
            });

            setSocket(socketIo);

            // Cleanup function to close socket connection
            return () => {
                socketIo?.close(); // Ensures the socket is closed when the component unmounts or user changes
            };
        } else {
            // If there's no user, ensure the socket is closed if it exists
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }

        return undefined; // Explicitly return undefined when there's no cleanup needed
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
