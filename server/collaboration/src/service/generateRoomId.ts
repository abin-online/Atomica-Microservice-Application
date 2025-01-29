import crypto from "crypto";

function generateRoomID() {
    const length: number = 6;
    const roomId: string = crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
    return roomId
}

export {
    generateRoomID
}