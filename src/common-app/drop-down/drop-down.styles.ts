import { css } from "@emotion/react";

export const rootDropDown = (dropdownHeight: string) => css`
  /* &[data-status="red"] {
    --status-color: red;
  }

  &[data-status="green"] {
    --status-color: green;
  }

  background-color: var(--status-color);

  */

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.5rem;
  gap: 1rem;

  width: 100%;
  z-index: 999999999;
  background-color: var(--global-02);
  border: solid 1px var(--global-01);
  border-width: ${dropdownHeight === "0" ? "0" : "1px"};
  max-height: 350px;
  overflow-y: ${Number(dropdownHeight) > 350 ? "scroll" : "hidden"};
  cursor: default;

  transition: height 0.5s ease, border-width 0.5s ease;

  height: var(--dropdown-height);
  /* Custom slim scrollbar styling for Webkit browsers */
  &::-webkit-scrollbar {
    width: 9px; // Slim scrollbar width
  }

  &::-webkit-scrollbar-track {
    background: #222;
    border-end-end-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555; // Scrollbar thumb color
    border-radius: 0.5rem; // Rounded corners
    border: 1px solid #222; // Optional: border to match the track
  }

  & > * {
    padding: 1rem 1rem 0.5rem;
  }
`;
