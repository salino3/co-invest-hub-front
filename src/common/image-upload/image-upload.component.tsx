import React, { useState } from "react";
import { CrossIcon } from "../icons";
import "./image-upload.styles.scss";

interface PropsImageUpload {
  id?: string;
  text?: string;
  accept?: string;
  disabled?: boolean;
  onFileSelected?: (file: File) => void;
  onClear?: () => void;
}

export const ImageUpload: React.FC<PropsImageUpload> = (props) => {
  const {
    id = "imageUploadInput",
    text = "Upload photo",
    accept = "image/*",
    disabled = false,
    onFileSelected,
    onClear,
  } = props;

  const [hasSelection, setHasSelection] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setHasSelection(true);
    setFileName(file.name);
    onFileSelected && onFileSelected(file);
  }

  return (
    <div className="imageUpload">
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="imageUploadInputHidden"
      />
      <label
        htmlFor={id}
        className={`imageUploadLabel ${disabled ? "disabled" : ""} ${
          hasSelection ? "selected" : ""
        }`}
        title={hasSelection ? fileName : undefined}
      >
        {hasSelection ? fileName || text : text}
      </label>
      <span className="imageUploadFeedback" aria-live="polite">
        {hasSelection ? "File selected" : ""}
      </span>
      {hasSelection && !disabled && (
        <button
          type="button"
          className="imageUploadClear"
          aria-label="Clear selected file"
          onClick={() => {
            setHasSelection(false);
            setFileName("");
            onClear && onClear();
          }}
        >
          <CrossIcon width={14} height={14} />
        </button>
      )}
    </div>
  );
};
