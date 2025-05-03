import { css } from "@emotion/react";

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
  align-items: flex-start;
  border-radius: 0.5rem;
  gap: 1rem;
  padding: 1rem 1rem 0.5rem;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  background-color: black;
  max-height: 350px;
  overflow-y: ${Number(height) > 350 ? "scroll" : null};
  cursor: default;

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

  & > .company_02 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
    border-bottom: solid 1px;
    padding-bottom: 2px;
    width: 100%;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  .opacityStyles {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
    padding: 0.1rem 0.5rem;
    border-radius: 0.5rem;
  }

  .addCompany {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    text-decoration: none;
  }
`;
