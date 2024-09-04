// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const Drag = () => {
//   const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const updatedItems = Array.from(items);
//     const [reorderedItem] = updatedItems.splice(result.source.index, 1);
//     updatedItems.splice(result.destination.index, 0, reorderedItem);

//     setItems(updatedItems);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={{ padding: "20px", background: "#f0f0f0" }}
//           >
//             {items.map((item, index) => (
//               <Draggable key={index} draggableId={`${index}`} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={{
//                       userSelect: "none",
//                       padding: "16px",
//                       margin: "0 0 8px 0",
//                       background: "#fff",
//                       border: "1px solid #ccc",
//                       ...provided.draggableProps.style,
//                     }}
//                   >
//                     {item}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default Drag;

// import React, { useState } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const HealthAndPhysical = () => {
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [isRecording, setRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   const handleMicClick = () => {
//     setPopupVisible(true);
//   };

//   const handleCancelClick = () => {
//     setPopupVisible(false);
//     setRecording(false);
//     setAudioURL(null);
//   };

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);
//     setMediaRecorder(recorder);
//     recorder.start();
//     setRecording(true);

//     recorder.ondataavailable = (event) => {
//       setAudioChunks((prev) => [...prev, event.data]);
//     };

//     recorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//       const url = URL.createObjectURL(audioBlob);
//       setAudioURL(url);
//       setRecording(false);
//     };
//   };

//   const stopRecording = () => {
//     mediaRecorder.stop();
//   };

//   return (
//     <div>
//       <div className="mic-icon" onClick={handleMicClick}>
//         <i className="fa fa-microphone" aria-hidden="true"></i>
//       </div>
//       {isPopupVisible && (
//         <div className="popup">
//           <button onClick={startRecording} disabled={isRecording}>
//             {isRecording ? "Recording..." : "Start Recording"}
//           </button>
//           {isRecording && (
//             <button onClick={stopRecording}>Stop Recording</button>
//           )}
//           <button onClick={handleCancelClick}>Cancel</button>
//           {audioURL && (
//             <div>
//               <audio controls src={audioURL}></audio>
//             </div>
//           )}
//         </div>
//       )}
//       {/* The rest of your static content here */}
//     </div>
//   );
// };

// export default HealthAndPhysical;

// import React, { useState, useEffect } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./health.css";

// const HealthAndPhysical = () => {
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [isRecording, setRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [chunks, setChunks] = useState([]);

//   useEffect(() => {
//     // Setup the media recorder when the component mounts
//     let recorder;
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ audio: true })
//         .then((stream) => {
//           recorder = new MediaRecorder(stream);
//           setMediaRecorder(recorder);

//           recorder.ondataavailable = (e) => {
//             setChunks((prevChunks) => [...prevChunks, e.data]);
//           };

//           recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//             const url = window.URL.createObjectURL(blob);
//             setAudioURL(url);
//             setChunks([]); // Clear chunks after recording
//           };
//         })
//         .catch((error) => {
//           console.error("Error accessing media devices.", error);
//         });
//     }
//   }, [chunks]);

//   const startRecording = () => {
//     if (mediaRecorder) {
//       setRecording(true);
//       mediaRecorder.start();
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const handleMicClick = () => {
//     setPopupVisible(true);
//   };

//   const handleCancelClick = () => {
//     setPopupVisible(false);
//     setRecording(false);
//     setAudioURL(null);
//     setChunks([]);
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="mic-icon" onClick={handleMicClick}>
//           <i className="fa fa-microphone" aria-hidden="true"></i>
//         </div>
//         {isPopupVisible && (
//           <div className="popup">
//             <button onClick={startRecording} disabled={isRecording}>
//               {isRecording ? "Recording..." : "Start Recording"}
//             </button>
//             {isRecording && (
//               <button onClick={stopRecording}>Stop Recording</button>
//             )}
//             <button onClick={handleCancelClick}>Cancel</button>
//             {audioURL && (
//               <div>
//                 <audio controls src={audioURL} key={audioURL}></audio>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HealthAndPhysical;

// import React, { useState, useEffect } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./health.css";

// const HealthAndPhysical = () => {
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [isRecording, setRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [chunks, setChunks] = useState([]);

//   useEffect(() => {
//     let stream;
//     let recorder;
//     // Setup the media recorder when the component mounts
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ audio: true })
//         .then((audioStream) => {
//           stream = audioStream;
//           recorder = new MediaRecorder(stream);
//           setMediaRecorder(recorder);

//           recorder.ondataavailable = (e) => {
//             setChunks((prevChunks) => [...prevChunks, e.data]);
//           };

//           recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//             const url = window.URL.createObjectURL(blob);
//             setAudioURL(url);
//             setChunks([]); // Clear chunks after recording
//           };
//         })
//         .catch((error) => {
//           console.error("Error accessing media devices.", error);
//         });
//     }

//     return () => {
//       // Clean up media recorder and stream when component unmounts
//       if (recorder && recorder.state !== "inactive") {
//         recorder.stop();
//       }
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const startRecording = () => {
//     if (mediaRecorder) {
//       setRecording(true);
//       mediaRecorder.start();
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const handleMicClick = () => {
//     setPopupVisible(true);
//   };

//   const handleCancelClick = () => {
//     setPopupVisible(false);
//     setRecording(false);
//     setAudioURL(null);
//     setChunks([]);
//   };

//   return (
//     <div className="container">
//       <div className="mic-icon" onClick={handleMicClick}>
//         <i className="fa fa-microphone" aria-hidden="true"></i>
//       </div>
//       {isPopupVisible && (
//         <div className="popup">
//           <button onClick={startRecording} disabled={isRecording}>
//             {isRecording ? "Recording..." : "Start Recording"}
//           </button>
//           {isRecording && (
//             <button onClick={stopRecording}>Stop Recording</button>
//           )}
//           <button onClick={handleCancelClick}>Cancel</button>
//           {audioURL && (
//             <div>
//               <audio controls src={audioURL} key={audioURL}></audio>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HealthAndPhysical;

// import React, { useState } from "react";
// import { FaMicrophone } from "react-icons/fa";
// import "./health.css";

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   const handleStartRecording = async () => {
//     setShowPopup(false);
//     setIsRecording(true);
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);
//     setMediaRecorder(recorder);

//     recorder.ondataavailable = (event) => {
//       setAudioChunks((prev) => [...prev, event.data]);
//     };

//     recorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setRecordings((prev) => [...prev, audioUrl]);
//       setAudioChunks([]);
//     };

//     recorder.start();
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings(recordings.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="container">
//       <button className="microphone-button" onClick={() => setShowPopup(true)}>
//         <FaMicrophone className="microphone-icon" />
//       </button>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={() => setShowPopup(false)}>
//             Cancel
//           </button>
//         </div>
//       )}

//       {isRecording && (
//         <button className="stop-button" onClick={handleStopRecording}>
//           Stop Recording
//         </button>
//       )}

//       <div className="recordings-list">
//         {recordings.map((recording, index) => (
//           <div key={index} className="recording-item">
//             <audio controls src={recording}></audio>
//             <button
//               className="remove-button"
//               onClick={() => handleRemoveRecording(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HealthandPhysical;

// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaTimes } from "react-icons/fa";
// import { ReactMic } from "react-mic";
// import "./health.css";

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMic, setShowMic] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);
//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setTimer(0);
//     setShowPopup(false);
//   };

//   const handleStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     const audioUrl = recordedBlob.blobURL;
//     setRecordings((prev) => [...prev, audioUrl]);
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings(recordings.filter((_, i) => i !== index));
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//   };

//   return (
//     <div className="main-container">
//       <div className="yellow-background">
//         {!showMic && (
//           <button className="start-button" onClick={() => setShowMic(true)}>
//             Let's Start
//           </button>
//         )}
//         {showMic && (
//           <>
//             <button className="cancel-icon" onClick={() => setShowMic(false)}>
//               <FaTimes />
//             </button>
//             <button
//               className="microphone-button"
//               onClick={() => setShowPopup(true)}
//             >
//               <FaMicrophone className="microphone-icon" />
//             </button>
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={() => setShowPopup(false)}>
//             Cancel
//           </button>
//         </div>
//       )}

//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleStopRecording}
//         strokeColor="#000000"
//         mimeType="audio/mp3"
//       />

//       {isRecording && (
//         <div className="timer">
//           <span>Recording: {formatTime(timer)}</span>
//           <button className="stop-button" onClick={() => setIsRecording(false)}>
//             Stop Recording
//           </button>
//         </div>
//       )}

//       <div className="recordings-list">
//         {recordings.map((recording, index) => (
//           <div key={index} className="recording-item">
//             <audio controls src={recording}></audio>
//             <button
//               className="remove-button"
//               onClick={() => handleRemoveRecording(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HealthandPhysical;

// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaTimes } from "react-icons/fa";
// import { ReactMic } from "react-mic";
// import "./health.css";

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMic, setShowMic] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setTimer(0);
//     setShowPopup(false);
//   };

//   const handleStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings(recordings.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setShowMic(false);
//     setShowPopup(false);
//     setRecordings([]);
//   };

//   return (
//     <div className="main-container">
//       <div className="yellow-background">
//         {!showMic && (
//           <button className="start-button" onClick={() => setShowMic(true)}>
//             Let's Start
//           </button>
//         )}
//         {showMic && (
//           <>
//             <button className="cancel-icon" onClick={handleCancel}>
//               <FaTimes />
//             </button>
//             <button
//               className="microphone-button"
//               onClick={() => setShowPopup(true)}
//             >
//               <FaMicrophone className="microphone-icon" />
//             </button>
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={handleCancel}>
//             Cancel
//           </button>
//         </div>
//       )}

//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleStopRecording}
//         strokeColor="#000000"
//         mimeType="audio/webm"
//       />

//       {isRecording && (
//         <div className="timer">
//           <span>Recording: {timer}</span>
//           <button className="stop-button" onClick={() => setIsRecording(false)}>
//             Stop Recording
//           </button>
//         </div>
//       )}

//       <div className="recordings-list">
//         {recordings.map((recording, index) => (
//           <div key={index} className="recording-item">
//             <audio controls src={recording}></audio>
//             <button
//               className="remove-button"
//               onClick={() => handleRemoveRecording(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HealthandPhysical;

// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaTimes } from "react-icons/fa";
// import { ReactMic } from "react-mic";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./health.css";

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMic, setShowMic] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setTimer(0);
//     setShowPopup(false);
//   };

//   const handleStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings(recordings.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setShowMic(false);
//     setShowPopup(false);
//     setRecordings([]);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(recordings);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setRecordings(items);
//   };

//   return (
//     <div className="main-container">
//       <div className="yellow-background">
//         {!showMic && (
//           <button className="start-button" onClick={() => setShowMic(true)}>
//             Let's Start
//           </button>
//         )}
//         {showMic && (
//           <>
//             <button className="cancel-icon" onClick={handleCancel}>
//               <FaTimes />
//             </button>
//             <button
//               className="microphone-button"
//               onClick={() => setShowPopup(true)}
//             >
//               <FaMicrophone className="microphone-icon" />
//             </button>
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={handleCancel}>
//             Cancel
//           </button>
//         </div>
//       )}

//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleStopRecording}
//         strokeColor="#000000"
//         mimeType="audio/webm"
//       />

//       {isRecording && (
//         <div className="timer">
//           <span>Recording: {timer}</span>
//           <button className="stop-button" onClick={() => setIsRecording(false)}>
//             Stop Recording
//           </button>
//         </div>
//       )}

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided) => (
//             <div
//               className="recordings-list"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {recordings.map((recording, index) => (
//                 <Draggable key={index} draggableId={`${index}`} index={index}>
//                   {(provided) => (
//                     <div
//                       className="recording-item"
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <audio controls src={recording}></audio>
//                       <button
//                         className="remove-button"
//                         onClick={() => handleRemoveRecording(index)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default HealthandPhysical;

// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaTimes } from "react-icons/fa";
// import { ReactMic } from "react-mic";
// import { sortableContainer, sortableElement } from "react-sortable-hoc";
// import { arrayMoveImmutable } from "array-move"; // Updated import
// import "./health.css";

// const SortableItem = sortableElement(({ recording, index, onRemove }) => (
//   <div className="recording-item">
//     <audio controls src={recording}></audio>
//     <button className="remove-button" onClick={() => onRemove(index)}>
//       Remove
//     </button>
//   </div>
// ));

// const SortableList = sortableContainer(({ items, onRemove }) => (
//   <div className="recordings-list">
//     {items.map((recording, index) => (
//       <SortableItem
//         key={`item-${index}`}
//         index={index}
//         recording={recording}
//         onRemove={onRemove}
//       />
//     ))}
//   </div>
// ));

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMic, setShowMic] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setTimer(0);
//     setShowPopup(false);
//   };

//   const handleStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings(recordings.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setShowMic(false);
//     setShowPopup(false);
//     setRecordings([]);
//   };

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setRecordings((prev) => arrayMoveImmutable(prev, oldIndex, newIndex)); // Updated usage
//   };

//   return (
//     <div className="main-container">
//       <div className="yellow-background">
//         {!showMic && (
//           <button className="start-button" onClick={() => setShowMic(true)}>
//             Let's Start
//           </button>
//         )}
//         {showMic && (
//           <>
//             <button className="cancel-icon" onClick={handleCancel}>
//               <FaTimes />
//             </button>
//             <button
//               className="microphone-button"
//               onClick={() => setShowPopup(true)}
//             >
//               <FaMicrophone className="microphone-icon" />
//             </button>
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={handleCancel}>
//             Cancel
//           </button>
//         </div>
//       )}

//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleStopRecording}
//         strokeColor="#000000"
//         mimeType="audio/webm"
//       />

//       {isRecording && (
//         <div className="timer">
//           <span>Recording: {timer}</span>
//           <button className="stop-button" onClick={() => setIsRecording(false)}>
//             Stop Recording
//           </button>
//         </div>
//       )}

//       <SortableList
//         items={recordings}
//         onSortEnd={onSortEnd}
//         onRemove={handleRemoveRecording}
//       />
//     </div>
//   );
// };

// export default HealthandPhysical;

// import React, { useEffect, useState } from "react";
// import { FaMicrophone, FaTimes } from "react-icons/fa";
// import { ReactMic } from "react-mic";
// import { sortableContainer, sortableElement } from "react-sortable-hoc";
// import { arrayMoveImmutable } from "array-move";
// import "./health.css";

// const SortableItem = sortableElement(({ recording, index, onRemove }) => {
//   console.log(recording);
//   return (
//     <div className="recording-item">
//       <audio controls src={recording}></audio>
//       <button
//         className="remove-button"
//         onClick={(e) => {
//           e.stopPropagation(); // Prevents triggering drag when clicking remove
//           onRemove(recording); // Trigger the removal of the item
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   );
// });

// const SortableList = sortableContainer(({ items, onRemove }) => (
//   <div className="recordings-list">
//     {items.map((recording, index) => (
//       <SortableItem
//         key={`item-${index}`}
//         index={index}
//         recording={recording}
//         onRemove={onRemove}
//       />
//     ))}
//   </div>
// ));

// const HealthandPhysical = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMic, setShowMic] = useState(false);
//   const [timer, setTimer] = useState(0);
//   console.log(recordings);
//   useEffect(() => {
//     let interval;
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setTimer(0);
//     setShowPopup(false);
//   };

//   const handleStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//   };

//   const handleRemoveRecording = (index) => {
//     setRecordings((prev) => prev.filter((item) => item !== index));
//   };

//   const handleCancel = () => {
//     setShowMic(false);
//     setShowPopup(false);
//     setRecordings([]);
//   };

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setRecordings((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
//   };

//   return (
//     <div className="main-container">
//       <div className="yellow-background">
//         {!showMic && (
//           <button className="start-button" onClick={() => setShowMic(true)}>
//             Let's Start
//           </button>
//         )}
//         {showMic && (
//           <>
//             <button className="cancel-icon" onClick={handleCancel}>
//               <FaTimes />
//             </button>
//             <button
//               className="microphone-button"
//               onClick={() => setShowPopup(true)}
//             >
//               <FaMicrophone className="microphone-icon" />
//             </button>
//           </>
//         )}
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <button className="record-button" onClick={handleStartRecording}>
//             Start Recording
//           </button>
//           <button className="cancel-button" onClick={handleCancel}>
//             Cancel
//           </button>
//           {isRecording && (
//             <div className="timer">
//               <span>Recording: {timer}</span>
//               <button
//                 className="stop-button"
//                 onClick={() => setIsRecording(false)}
//               >
//                 Stop Recording
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleStopRecording}
//         strokeColor="#000000"
//         mimeType="audio/webm"
//       />

//       {isRecording && (
//         <div className="timer">
//           <span>Recording: {timer}</span>
//           <button className="stop-button" onClick={() => setIsRecording(false)}>
//             Stop Recording
//           </button>
//         </div>
//       )}

//       <SortableList
//         items={recordings}
//         onSortEnd={onSortEnd}
//         onRemove={handleRemoveRecording}
//       />
//     </div>
//   );
// };

// export default HealthandPhysical;
