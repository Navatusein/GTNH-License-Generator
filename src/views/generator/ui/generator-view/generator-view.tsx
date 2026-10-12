import "./generator-view.css";

import {useRef, useState} from "react";
import {LicensePreview, MAX_NICK_LENGTH, defaultExpiry, isExpired, isIsoDate} from "@/entities/license";
import {DownloadLicenseButton} from "@/features/download-license";

const PLACEHOLDER_NICK = "Steve";

export default function GeneratorView() {
  const [nick, setNick] = useState("");
  const [expires, setExpires] = useState(defaultExpiry);
  const cardRef = useRef<HTMLDivElement>(null);

  const isValid = nick.length > 0 && isIsoDate(expires);

  const data = {
    nick: nick || PLACEHOLDER_NICK,
    expires: isIsoDate(expires) ? expires : defaultExpiry(),
  };

  return (
    <div className="generator-view">
      <form className="panel generator-form" onSubmit={(event) => event.preventDefault()}>
        <h1>Получить лицензию</h1>
        <p className="muted-text">
          Введи ник — и получи официальное* право срать механизмами в GregTech: New Horizons.
        </p>

        <label className="field">
          <span>Ник игрока</span>
          <input
            type="text"
            value={nick}
            placeholder={PLACEHOLDER_NICK}
            maxLength={MAX_NICK_LENGTH}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => setNick(event.target.value.replace(/\s/g, ""))}
          />
        </label>

        <label className="field">
          <span>Действует до</span>
          <input type="date" value={expires} onChange={(event) => setExpires(event.target.value)}/>
        </label>

        {isExpired(data.expires) && (
          <p className="error-text">Дата уже прошла — лицензия будет выдана неактивной.</p>
        )}

        <DownloadLicenseButton targetRef={cardRef} nick={data.nick} disabled={!isValid}/>

        <p className="muted-text small-text">
          QR-код на лицензии ведёт на страницу проверки подлинности.
          <br/>
          * Не является официальным документом. Вообще.
        </p>
      </form>

      <LicensePreview data={data} cardRef={cardRef}/>
    </div>
  );
}
