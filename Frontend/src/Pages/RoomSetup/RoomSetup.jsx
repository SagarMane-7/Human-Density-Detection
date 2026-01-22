import React, { useRef, useEffect, useState } from "react";
import styles from "./RoomSetup.module.css";
import Navbar from '../../Component/Navbar/Navbar'
import Button from '../../Component/Button/Button'
import { useRoomSetup } from "./RoomSetup.js";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import Animation from "../../Component/Animation/Animation.jsx";

export default function RoomSetup() {
  const state = useRoomSetup();
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ w: 400, h: 400 });
  const [showAnimation, setShowAnimation] = useState(true);
      
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({
          w: clientWidth - 20,
          h: clientHeight - 20,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (showAnimation) {
        return <Animation />;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <p style={{ fontSize: "25px", color: "#132d46", fontWeight: "700", marginLeft: "50px" }}>Room Setup</p>
      <div className={styles.inner}>
        <div className={styles.formCard}>
          <div className={styles.roomname}>
            <label className={styles.label}>Room Name</label>
            <input
              className={styles.input}
              value={state.roomName}
              onChange={(e) => state.setRoomName(e.target.value)}
              placeholder="Enter Room Name"
              style={{ width: "350px" }}
            />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label}>Dimensions</label>
            <div className={styles.inputRow}>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className={styles.inputSmall}
                  value={state.length}
                  onChange={(e) => state.setLength(e.target.value)}
                  placeholder="L"
                />
              </div>
              <p style={{color: "#132d46", fontWeight: "700"}}>X</p>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className={styles.inputSmall}
                  value={state.width}
                  onChange={(e) => state.setWidth(e.target.value)}
                  placeholder="W"
                />
              </div>
              <p style={{color: "#132d46", fontWeight: "700"}}>X</p>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className={styles.inputSmall}
                  value={state.height}
                  onChange={(e) => state.setHeight(e.target.value)}
                  placeholder="H"
                />
              </div>
            </div>
          </div>
           {state.layout && (
            <div className={styles.sensorListBox}>
              <p className={styles.sensorList} style={{color: "#132d46", fontWeight: "500"}}>Number Of Sensors: {state.layout.sensors.length}</p>
              <p className={styles.sensorList} style={{color: "#132d46", fontWeight: "500"}}>Sensor Co-ordinates:</p>
              <ul className={styles.sensorList}>
                {state.layout.sensors.map((s, idx) => (
                  <li key={s.id}>
                    Sensor {idx + 1} - ({s.x.toFixed(1)}, {s.y.toFixed(1)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className={styles.label}>Gateway ESP32 ID</label>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }} >
              <input
                value={state.espId}
                onChange={(e) => state.setEspId(e.target.value)}
                className={styles.input}
                placeholder="Enter ESP32 ID "
              />
              <Button
                onClick={state.handleVerify}
                type="button"
                style={{ opacity: state.verifying ? 0.6 : 1, width: "100px", height: "50px" }}
              >
                {state.verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
            {state.verifyStatus && (
              <div className={styles.smallNote}>
                {state.verifyStatus.ok
                  ? "Verified ✅"
                  : `Not verified: ${state.verifyStatus.message}`}
              </div>
            )}
          </div>

          {state.error && (
            <p className={styles.error}>{state.error}</p>
          )}

          <div className={styles.rowActions}>
            <Button
              type="button"
              onClick={state.handleReset}
              style={{ width: "100px", height: "50px" }}
            >
              Reset
            </Button>
            <Button
              onClick={state.handleAddRoom}
              type="button"
              style={{ opacity: state.creating ? 0.6 : 1, width: "150px", height: "50px" }}
            >
              {state.creating ? "Creating..." : "Add Room"}
            </Button>
          </div>

         
        </div>

        <div className={styles.blueprintCard} ref={containerRef}>
          {state.layout ? (
            <div className={styles.blueprintCanvas}>
              <Stage width={canvasSize.w} height={canvasSize.h}>
                <Layer>
                  {(() => {
                    const scaleX = canvasSize.w / state.length;
                    const scaleY = canvasSize.h / state.width;
                    const scale = Math.min(scaleX, scaleY);
                    const roomWidthPx = state.length * scale;
                    const roomHeightPx = state.width * scale;
                    const offsetX = (canvasSize.w - roomWidthPx) / 2;
                    const offsetY = (canvasSize.h - roomHeightPx) / 2;

                    return (
                      <>
                        <Rect
                          x={offsetX}
                          y={offsetY}
                          width={roomWidthPx}
                          height={roomHeightPx}
                          stroke="#333"
                          strokeWidth={2}
                          fill="#fff"
                        />
                        {state.layout.sensors.map((s, idx) => (
                          <React.Fragment key={s.id}>
                            <Circle
                              x={offsetX + s.x * scale}
                              y={offsetY + s.y * scale}
                              radius={20}
                              fill="#00CC99"
                              stroke="#132d46"
                              strokeWidth={1}
                            />
                            <Text
                              x={offsetX + s.x * scale - 8}
                              y={offsetY + s.y * scale - 6}
                              text={`S${idx + 1}`}
                              fontSize={12}
                              fill="#132d46"
                            />
                          </React.Fragment>
                        ))}
                      </>
                    );
                  })()}
                </Layer>
              </Stage>
            </div>
          ) : (
            <div className={styles.legend}>Enter dimensions to see layout</div>
          )}
        </div>
      </div>
    </div>
  );
}
