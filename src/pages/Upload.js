import React from "react";
import Resumable from "resumablejs";

export default function Upload() {
  const resumable = new Resumable({
    target: "http://127.0.0.1:8000/api/store",
    chunkSize: 1 * 1024 * 1024 * 5,
    simultaneousUploads: 4,
    testChunks: false,
  });

  resumable.on("fileAdded", function (file) {
    console.log("File added:", file);
  });

  resumable.on("fileProgress", function (file) {
    console.log("File progress:", file.progress());
  });

  resumable.on("fileSuccess", function (file, message) {
    console.log("File success:", file, message);
  });

  resumable.on("fileError", function (file, message) {
    console.log("File error:", file, message);
  });

  function handleFileSelect(e) {
    const file = e.target.files[0];
    resumable.addFile(file);
  }

  function handleUpload() {
    resumable.upload();
  }

  function handleCancel() {
    resumable.cancel();
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: "300px",
          height: "500px",
          textAlign: "center",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <div>
          <input type="file" onChange={handleFileSelect} />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}
