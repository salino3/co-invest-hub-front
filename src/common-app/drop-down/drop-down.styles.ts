import { css } from "styled-components";

export const rootDropDown = (height: string) => css`
  @keyframes show {
    from {
      height: 0px;
    }

    to {
      height: ${height}px;
    }
  }

  @keyframes cover {
    from {
      height: ${height}px;
    }

    to {
      height: 0px;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  gap: 1rem;
  padding: 1rem 1rem 0.5rem;
  height: 100%;
  z-index: 999999999;
  background-color: black;
  max-height: 350px;
  overflow-y: ${Number(height) > 350 ? "scroll" : null};

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

  & > div {
    border: solid;
  }
`;
