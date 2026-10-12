import {type RefObject, useState} from "react";
import {downloadNodeAsPng} from "@/share/helpers/image-helper.ts";
import {LICENSE_HEIGHT, LICENSE_WIDTH} from "@/entities/license";

interface IProps {
  targetRef: RefObject<HTMLDivElement | null>;
  nick: string;
  disabled?: boolean;
}

export default function DownloadLicenseButton(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    if (!props.targetRef.current)
      return;

    setIsLoading(true);
    setError(null);

    try {
      const fileName = `gtnh-license-${props.nick.replace(/[^\p{L}\p{N}_-]/gu, "_")}.png`;
      await downloadNodeAsPng(props.targetRef.current, fileName, LICENSE_WIDTH, LICENSE_HEIGHT);
    }
    catch (e) {
      console.error(e);
      setError("Не удалось сохранить картинку");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="button" type="button" onClick={download} disabled={props.disabled || isLoading}>
        {isLoading ? "Печатаем..." : "Скачать PNG"}
      </button>
      {error && <p className="error-text">{error}</p>}
    </>
  );
}
