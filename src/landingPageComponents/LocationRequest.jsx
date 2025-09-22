import React, { useEffect, useState } from "react";

/**
 * Props:
 *  - onLocation({ latitude, longitude, accuracy, source }) => called when location available
 *  - promptText - optional text shown in popup
 *  - timeout - geolocation timeout in ms (default 10000)
 */
export default function LocationRequest({
  onLocation,
  promptText = "यह ऐप आपके आस-पास की रिपोर्ट दिखाने के लिए आपके स्थान का उपयोग करना चाहता है।",
  timeout = 10000,
}) {
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | requesting | granted | denied | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!navigator.permissions) return;
    let mounted = true;
    navigator.permissions
      .query({ name: "geolocation" })
      .then((perm) => {
        if (!mounted) return;
        if (perm.state === "granted") setStatus("granted");
        if (perm.state === "denied") setStatus("denied");
        perm.onchange = () => {
          if (perm.state === "granted") setStatus("granted");
          if (perm.state === "denied") setStatus("denied");
        };
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("आपके ब्राउज़र में स्थान सुविधा समर्थित नहीं है।");
      return;
    }

    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setStatus("granted");
        setErrorMsg("");
        setVisible(false);
        onLocation &&
          onLocation({ latitude, longitude, accuracy, source: "geolocation" });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setStatus("denied");
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg(
            "स्थान अनुमति अस्वीकृत। इसे ब्राउज़र सेटिंग्स से सक्षम करें।"
          );
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setErrorMsg("स्थिति उपलब्ध नहीं है। पुनः प्रयास करें।");
        } else if (err.code === err.TIMEOUT) {
          setErrorMsg("अनुरोध समय समाप्त। पुनः प्रयास करें।");
        } else {
          setErrorMsg("स्थान अनुरोध के दौरान अज्ञात त्रुटि।");
        }
      },
      { enableHighAccuracy: true, timeout, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (status === "granted" && visible) {
      requestLocation();
    }
  }, [status]);

  if (!visible) return null;

  return (
    <div style={styles.backdrop}>
      <div role="dialog" aria-modal="true" style={styles.modal}>
        <h3 style={styles.title}>स्थान पहुँच की अनुमति दें?</h3>
        <p style={styles.text}>{promptText}</p>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

        <div style={styles.controls}>
          <button
            onClick={requestLocation}
            disabled={status === "requesting"}
            style={styles.primaryBtn}
          >
            {status === "requesting" ? "अनुरोध जारी…" : "स्थान अनुमति दें"}
          </button>

          <button
            onClick={() => {
              setVisible(false);
              setStatus("denied");
            }}
            style={styles.ghostBtn}
          >
            अब नहीं
          </button>
        </div>

        <div style={styles.hint}>
          <small>आप बाद में ब्राउज़र सेटिंग्स से स्थान सक्षम कर सकते हैं।</small>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    width: 360,
    maxWidth: "95%",
    background: "#fff",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  text: { fontSize: "0.95rem", color: "#333", marginBottom: 12 },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  primaryBtn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    background: "#0b76ff",
    color: "white",
    fontWeight: "500",
  },
  ghostBtn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: "500",
  },
  error: {
    color: "#a00",
    background: "#fee",
    padding: "8px",
    borderRadius: 6,
    marginTop: 8,
    fontSize: "0.9rem",
  },
  hint: { marginTop: 12, color: "#666", fontSize: "0.8rem" },
};
