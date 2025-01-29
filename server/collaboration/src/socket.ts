import { Server } from "socket.io";

export const initSocket = (server: any): void => {
    //console.log(process.env.CORS_ORIGIN)
    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN ,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (roomId: string) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        socket.on('audio-chunk', (data) => {
            const { roomId, chunk } = data;
            socket.to(roomId).emit('audio-chunk', chunk); // Forward to others in the same room
          });

        socket.on("code-change", ({ roomId, content }) => {
            console.log(`User ${socket.id} updated the code in room ${roomId} :=>>> ${content}`);
            console.log(socket.to(roomId).emit("update-code", content));
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    console.log("Socket.IO initialized.");
};

