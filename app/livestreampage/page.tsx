"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaStop,
  FaTachometerAlt,
  FaShareAlt,
} from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { useRouter } from "next/navigation";
// import { SiFacebook, SiYoutube } from "react-icons/si";
import { SiWhatsapp } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import Livepageloader from "../components/livepageloader";

const LiveStreamPage = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isMicOn, setMicOn] = useState(true);
  const [isCameraOn, setCameraOn] = useState(true);
  const [notification, setNotification] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [streamHistory, setStreamHistory] = useState<any[]>([]);
  const [sharePopup, setSharePopup] = useState<{
    visible: boolean;
    link: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Mimic loading time
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Load stream history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("streamHistory") || "[]"
    );
    setStreamHistory(savedHistory);
  }, []);

  // Load stream history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("streamHistory") || "[]"
    );
    setStreamHistory(savedHistory);
  }, []);

  // Save stream history to localStorage
  useEffect(() => {
    localStorage.setItem("streamHistory", JSON.stringify(streamHistory));
  }, [streamHistory]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsStreaming(true);
      setNotification("Live stream started!");

      const link = `${window.location.origin}/live/${Math.random()
        .toString(36)
        .substring(2, 15)}`;
      setInviteLink(link);

      const streamInfo = {
        title: "New Stream",
        user: "Avi Bhatnagar",
        timestamp: new Date().toLocaleString(),
        shareLink: link,
      };
      setStreamHistory((prev) => [streamInfo, ...prev]);

      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error accessing media devices.", error);
      setNotification("Error accessing media devices!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const stopStreaming = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsStreaming(false);
      const tracks = mediaRecorder.stream.getTracks();
      tracks.forEach((track) => track.stop());
      setNotification("Live stream ended!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleDownload = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `recorded-video.mp4`;
      a.click();
      URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  };

  const handleMicToggle = () => {
    setMicOn((prev) => {
      const newMicState = !prev;
      mediaRecorder?.stream.getAudioTracks().forEach((track) => {
        track.enabled = newMicState;
      });
      return newMicState;
    });
  };

  const handleCameraToggle = () => {
    setCameraOn((prev) => {
      const newCameraState = !prev;
      const videoTrack = (
        videoRef.current?.srcObject as MediaStream
      )?.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = newCameraState;
      return newCameraState;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification("Link copied to clipboard!");
    setTimeout(() => setNotification(""), 2000);
  };

  // Open share popup with WhatsApp and Email options
  const openSharePopup = (link: string) => {
    setSharePopup({ visible: true, link });
  };

  // Delete a specific stream from history
  const deleteStream = (index: number) => {
    const updatedHistory = [...streamHistory];
    updatedHistory.splice(index, 1);
    setStreamHistory(updatedHistory);
  };

  return loading ? (
    <Livepageloader />
  ) : (
    
    <div className="flex flex-row justify-center h-screen hide-scrollbar overflow-y-${overflow} hsl(240 5.9% 10%) text-white font-sans ">
      {/* Left Navigation Panel */}
      
      <div
        suppressHydrationWarning
        className="flex items-center justify-center h-screen"
      >
        {/* Loader code */}
      </div>

      <div className="relative group w-16 bg-gray-900 hover:w-48 transition-all duration-300 ">
        <div className="flex flex-col items-center mt-8 space-y-6 ">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-lg font-semibold flex items-center hover:text-green-400 transition-colors duration-300"
          >
            <FaTachometerAlt className="mr-2" />
            <span className="hidden group-hover:block">Dashboard</span>
          </button>
          <button
            onClick={() => router.push("/destination")}
            className="text-lg font-semibold flex items-center hover:text-blue-400 transition-colors duration-300"
          >
            <FaShareAlt className="mr-2" />
            <span className="hidden group-hover:block">Destination</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 justify-center items-center overflow-y-${overflow} hide-scrollbar">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Live Stream Dashboard
        </h1>

        {/* Centered Video Section */}
        <div className="flex justify-center items-center w-full max-w-4xl mb-5 ">
          <div
            className="relative w-full max-w-5xl border border-black rounded-lg overflow-hidden shadow-xl"
            style={{ paddingBottom: "56.25%" }}
          >
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              autoPlay
              muted
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-6 mb-10">
          <button
            onClick={isStreaming ? stopStreaming : startStream}
            className={`px-12 py-5 text-sm uppercase tracking-wider font-medium text-black bg-white border-none rounded-full shadow-lg transition-all duration-300 ease-in-out transform outline-none ${
              isStreaming
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-600"
            } hover:text-white hover:shadow-xl hover:-translate-y-1 active:translate-y-0.3`}
          >
            {isStreaming ? "Stop Stream" : "Start Stream"}
          </button>

          <button
            onClick={handleMicToggle}
            className={`px-9 py-5 rounded-full transition-transform transform hover:scale-110 shadow-lg ${
              isMicOn
                ? "bg-gray-900 hover:bg-gray-800"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>

          <button
            onClick={handleCameraToggle}
            className={`px-9 py-5 rounded-full transition-transform transform hover:scale-110 shadow-lg ${
              isCameraOn
                ? "bg-gray-900 hover:bg-gray-800"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          <button
            onClick={handleDownload}
            className="relative flex uppercase items-center justify-center overflow-hidden  px-12 py-5 rounded-full bg-blue-600 text-white border-none cursor-pointer transition-transform transform hover:scale-110 shadow-lg group"
          >
            <span className="relative  z-10">Download</span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-full" />
          </button>
        </div>

        {/* Stream History Section */}
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Stream History
        </h2>
        <div className="max-h-80 overflow-y-auto px-2 space-y-4 hide-scrollbar">
          {streamHistory.map((stream, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{stream.title}</h3>
                <p className="text-gray-400">{`By: ${stream.user}`}</p>
                <p className="text-gray-400">{`At: ${stream.timestamp}`}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openSharePopup(stream.shareLink)}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform hover:scale-110"
                >
                  <HiOutlineShare className="text-white text-2xl" />
                </button>
                <button
                  onClick={() => deleteStream(index)}
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition transform hover:scale-110"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-10 right-10 bg-yellow-600 text-white p-4 rounded-lg shadow-lg transition duration-500">
            {notification}
          </div>
        )}

        {/* Share Popup */}
        {sharePopup?.visible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl mb-4">Share Stream Link</h3>
              <p className="text-white mb-6">{sharePopup.link}</p>
              <div className="flex space-x-4 justify-center">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    sharePopup.link
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500 rounded-full text-white"
                >
                  <SiWhatsapp size={24} />
                </a>
                <a
                  href={`mailto:?subject=Stream Link&body=${encodeURIComponent(
                    sharePopup.link
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-500 rounded-full text-white"
                >
                  <MdOutlineEmail size={24} />
                </a>
                <button
                  onClick={() => copyToClipboard(sharePopup.link)}
                  className="p-3 bg-gray-800 rounded-full text-white"
                >
                  Copy Link
                </button>
              </div>
              <button
                onClick={() => setSharePopup(null)}
                className="mt-4 text-white bg-red-500 p-3 rounded-lg hover:bg-red-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStreamPage;
