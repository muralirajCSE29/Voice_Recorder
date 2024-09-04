import React, { useEffect, useState } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { ReactMic } from "react-mic";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "./health.css";

// Sortable items for the audio list
const SortableItem = sortableElement(({ recording, index, onRemove }) => {
  return (
    <div className="recording-item">
      <audio controls src={recording}></audio>
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering drag when clicking remove
          onRemove(recording); // Trigger the removal of the item
        }}
      >
        Remove
      </button>
    </div>
  );
});

// Sortable container for the audio list
const SortableList = sortableContainer(({ items, onRemove }) => (
  <div className="recordings-list">
    {items.map((recording, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        recording={recording}
        onRemove={onRemove}
      />
    ))}
  </div>
));

const HealthandPhysical = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showMic, setShowMic] = useState(false);
  const [timer, setTimer] = useState(0);
  const [containerPos, setContainerPos] = useState({ top: 100, left: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setShowPopup(false);
  };

  const handleStopRecording = (recordedBlob) => {
    setIsRecording(false);
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    setRecordings((prev) => [...prev, audioUrl]);
  };

  const handleRemoveRecording = (index) => {
    setRecordings((prev) => prev.filter((item) => item !== index));
  };

  const handleCancel = () => {
    setIsRecording(false);
    setShowPopup(false);
    setShowMic(false);
    setRecordings([]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setRecordings((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  // Mouse down event for dragging the container
  const handleMouseDown = (e) => {
    if (e.target.closest(".recordings-list")) {
      // Prevent dragging the container when interacting with the sortable list
      return;
    }
    setIsDragging(true);
    setDragStart({
      x: e.clientX - containerPos.left,
      y: e.clientY - containerPos.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setContainerPos({
      top: e.clientY - dragStart.y,
      left: e.clientX - dragStart.x,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="drag-container"
      style={{
        position: "absolute",
        top: containerPos.top,
        left: containerPos.left,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="main-container">
        <div className="yellow-background">
          {!showMic && (
            <button className="start-button" onClick={() => setShowMic(true)}>
              Let's Start
            </button>
          )}
          {showMic && (
            <>
              <button className="cancel-icon" onClick={handleCancel}>
                <FaTimes />
              </button>
              <button
                className="microphone-button"
                onClick={() => setShowPopup(true)}
              >
                <FaMicrophone className="microphone-icon" />
              </button>
            </>
          )}
        </div>

        {showPopup && (
          <div className="popup">
            <button className="record-button" onClick={handleStartRecording}>
              Start Recording
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            {isRecording && (
              <div className="timer">
                <span>Recording: {timer}</span>
                <button
                  className="stop-button"
                  onClick={() => setIsRecording(false)}
                >
                  Stop Recording
                </button>
              </div>
            )}
          </div>
        )}

        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={handleStopRecording}
          strokeColor="#000000"
          mimeType="audio/webm"
        />

        {isRecording && (
          <div className="timer">
            <span>Recording: {timer}</span>
            <button
              className="stop-button"
              onClick={() => setIsRecording(false)}
            >
              Stop Recording
            </button>
          </div>
        )}

        <SortableList
          items={recordings}
          onSortEnd={onSortEnd}
          onRemove={handleRemoveRecording}
        />
      </div>
    </div>
  );
};

export default HealthandPhysical;
