import "./verify-view.css";

import {useSearchParams} from "react-router";
import {LicensePreview, formatExpiry, regNumber, verifyLicense} from "@/entities/license";

const STATUS_INFO = {
  active: {
    icon: "✔",
    title: "Лицензия подлинная",
    description: "Игрок имеет полное и неотъемлемое право срать механизмами.",
    label: "Активна",
  },
  expired: {
    icon: "!",
    title: "Срок действия истёк",
    description: "Лицензия настоящая, но просрочена. Срать механизмами временно запрещено.",
    label: "Просрочена",
  },
  invalid: {
    icon: "✖",
    title: "Лицензия не найдена",
    description: "Такой лицензии в реестре нет. Похоже на подделку — срать механизмами нельзя!",
    label: "Недействительна",
  },
};

export default function VerifyView() {
  const [searchParams] = useSearchParams();
  const result = verifyLicense(searchParams);
  const info = STATUS_INFO[result.status];

  return (
    <div className="verify-view">
      <section className={`panel verify-result ${result.status}`}>
        <div className="verify-icon">{info.icon}</div>
        <div>
          <p className="muted-text small-text">Реестр лицензий GTNH · проверка подлинности</p>
          <h1>{info.title}</h1>
          <p>{info.description}</p>
        </div>

        {result.status !== "invalid" && (
          <dl className="verify-details">
            <dt>Игрок</dt>
            <dd>{result.data.nick}</dd>
            <dt>Регистрационный номер</dt>
            <dd>{regNumber(result.data.nick)}</dd>
            <dt>Срок действия</dt>
            <dd>{formatExpiry(result.data.expires)}</dd>
            <dt>Статус</dt>
            <dd className="verify-status">{info.label}</dd>
          </dl>
        )}
      </section>

      {result.status !== "invalid" && <LicensePreview data={result.data}/>}
    </div>
  );
}
