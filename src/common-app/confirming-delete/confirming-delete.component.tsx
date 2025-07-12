import { SetStateAction, useEffect, useRef } from "react";
import { ServicesApp } from "../../services";
import "./confirming-delete.styles.scss";

interface Props {
  data: any;
  setData: React.Dispatch<SetStateAction<any>>;
  endpoint: string;
  text1?: string;
  content?: any;
  text2?: string;
  textBtn: string;
  ariaLabel: string;
}

export const ConfirmingDelete: React.FC<Props> = (props) => {
  const { data, setData, endpoint, text1, content, text2, ariaLabel, textBtn } =
    props;

  const confirmBtnf = useRef<HTMLButtonElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // (ServicesApp as any)?.[endpoint](data).then(() => {});
    setData(null);
  }

  useEffect(() => {
    // 'requestAnimationFrame' schedules a function to run just after DOM and before the next repaint or synchronous javascript.
    // It ensures that any DOM updates are completed, making it useful for visual changes or focus logic.
    // This provides better performance and avoids layout thrashing compared to setTimeout.
    // similar to 'useLayoutEffect
    const element = requestAnimationFrame(() => {
      confirmBtnf.current?.focus();
    });
    return () => {
      cancelAnimationFrame(element);
      const iconBin: HTMLElement | null = document.getElementById(
        "handleModalBinCompany"
      );
      if (iconBin) {
        iconBin.focus();
      }
    };
  }, []);

  return (
    <div className="rootConfirmingDelete">
      <form onSubmit={handleSubmit} id="formConfirmingDelete">
        <div className="bodyText">
          {text1 && <span>{text1}</span>}
          {content && <span>{content}</span>}
          {text2 && <span>{text2}</span>}
        </div>
        <div className="boxBtnsForm">
          <button
            aria-label={ariaLabel}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                const el = document.getElementById(
                  "closeModalWebButton"
                ) as HTMLButtonElement | null;
                el?.focus();
              }
            }}
            ref={confirmBtnf}
          >
            {textBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
