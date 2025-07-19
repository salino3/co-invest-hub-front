import { SetStateAction, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { MyCompany, useProviderSelector } from "../../store";
import { ServicesApp } from "../../services";
import { routesApp } from "../../router";
import "./confirming-delete.styles.scss";

interface Props {
  data: any;
  setData: React.Dispatch<SetStateAction<any>>;
  endpoint: string;
  body: any;
  text1?: string;
  text2?: string;
  textBtn: string;
  ariaLabel: string;
}

export const ConfirmingDelete: React.FC<Props> = (props) => {
  const { data, setData, endpoint, body, text1, text2, ariaLabel, textBtn } =
    props;

  const { myCompanies, setMyCompanies } = useProviderSelector(
    "myCompanies",
    "setMyCompanies"
  );

  const navigate = useNavigate();

  const confirmBtnf = useRef<HTMLButtonElement>(body);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (ServicesApp as any)
      ?.[endpoint](body)
      .then(() => {
        const newMyCompanies: MyCompany[] =
          myCompanies && myCompanies?.length > 0
            ? myCompanies.filter((c) => c?.id != body?.idCompany)
            : [];
        setMyCompanies && setMyCompanies(newMyCompanies);
      })
      .then(() => {
        setData(null);
        navigate(routesApp?.dashboard);
      });
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
          {text1 && (
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text1) }}
            />
          )}
          {data && (
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
            />
          )}
          {text2 && (
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text2) }}
            />
          )}
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
