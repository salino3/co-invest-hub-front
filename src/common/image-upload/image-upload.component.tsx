import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t: tw } = useTranslation("wcag");

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
        ref={inputRef}
        aria-hidden={true}
        tabIndex={-1}
        // Change 'key' for rerender <input> in case user mistakes, deletes photo and load same photo instantly
        key={fileName || "noFile"}
      />
      <label
        htmlFor={id}
        className={`imageUploadLabel ${disabled ? "disabled" : ""} ${
          hasSelection ? "selected" : ""
        }`}
        title={hasSelection ? fileName : undefined}
        role="button"
        aria-label={tw("aria.choose_element")}
        aria-controls={id}
        aria-disabled={disabled}
        tabIndex={0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
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
          aria-label={tw("aria.remove")}
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
