// /lib/webRTC.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

export const startVideoCall = (roomId, userId) => {
  socket.emit('join-room', roomId, userId); // Join the room
};

export const createOffer = async (roomId, userId) => {
  const peerConnection = new RTCPeerConnection();
  // Assuming you've already added the media stream
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  
  // Send the offer to the server
  socket.emit('signal', { roomId, userId, signal: offer });
};

export const createAnswer = async (roomId, userId, offer) => {
  const peerConnection = new RTCPeerConnection();
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  socket.emit('signal', { roomId, userId, signal: answer });
};

export const handleICECandidate = (roomId, userId, candidate) => {
  socket.emit('signal', { roomId, userId, signal: candidate });
};

// When a signal message is received
socket.on('signal', async (data) => {
  const { signal, from } = data;
  if (signal.type === 'offer') {
    // Handle offer, create an answer
    createAnswer(data.roomId, from, signal);
  } else if (signal.type === 'answer') {
    // Handle answer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
  } else if (signal.type === 'candidate') {
    // Handle ICE candidate
    const candidate = new RTCIceCandidate(signal);
    peerConnection.addIceCandidate(candidate);
  }
});

// Optional: Handling ICE Candidate events
const peerConnection = new RTCPeerConnection();
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    // Send ICE candidates to the other peer
    handleICECandidate('roomId', 'userId', event.candidate);
  }
};
