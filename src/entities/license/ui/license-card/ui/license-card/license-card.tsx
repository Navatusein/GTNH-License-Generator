import "./license-card.css";

import type {Ref} from "react";
import {QRCodeSVG} from "qrcode.react";
import type {LicenseData} from "../../../../types/type";
import {buildVerifyUrl, formatExpiry, isExpired, regNumber} from "../../../../helpers/license-helper";
import {Check, Corner, Gear, GoldSeal, Motor, Signature, Stamp} from "../license-art/license-art";

export const LICENSE_WIDTH = 1312;
export const LICENSE_HEIGHT = 1200;

const NICK_PLATE_WIDTH = 420;
const NICK_MAX_FONT_SIZE = 40;

const PERMISSIONS = [
  "Использовать механизмы для срания в любом месте сборки GTNH.",
  "Включать систему автоматической дефекации.",
  "Совмещать процесс с производством энергии, ресурсов и т.д.",
  "Срать стильно, эффективно и с пользой для прогресса!",
];

interface IProps {
  data: LicenseData;
  ref?: Ref<HTMLDivElement>;
}

export default function LicenseCard(props: IProps) {
  const {nick, expires} = props.data;
  const expired = isExpired(expires);
  const nickFontSize = Math.min(NICK_MAX_FONT_SIZE, Math.floor(NICK_PLATE_WIDTH / nick.length));

  return (
    <div className="license" ref={props.ref}>
      <div className="license-frame"/>
      <div className="license-frame license-frame-inner"/>
      <Corner className="license-corner top left"/>
      <Corner className="license-corner top right"/>
      <Corner className="license-corner bottom left"/>
      <Corner className="license-corner bottom right"/>

      <div className="license-logo">
        <Gear className="license-logo-gear"/>
        <div className="license-logo-plate">
          <div className="license-logo-gtnh">GTNH</div>
          <div className="license-logo-sub">GREGTECH</div>
          <div className="license-logo-sub small">NEW HORIZONS</div>
        </div>
      </div>

      <div className="license-motor">
        <Motor/>
        <p>
          Лучшие технологии
          <br/>
          для вашего
          <br/>
          комфорта!
        </p>
      </div>

      <header className="license-header">
        <div className="license-official">ОФИЦИАЛЬНАЯ ЛИЦЕНЗИЯ</div>
        <div className="license-issued-to">ВЫДАНА ИГРОКУ</div>
        <div className="chamfer license-nick-plate">
          <div className="chamfer-inner" style={{fontSize: nickFontSize}}>
            {nick}
          </div>
        </div>
        <div className="license-no-limits">БОЛЬШЕ НИКАКИХ ЗАПРЕТОВ — ТЕПЕРЬ ТЫ МОЖЕШЬ</div>
      </header>

      <div className="license-title-block">
        <h1>СРАТЬ МЕХАНИЗМАМИ</h1>
        <h2>В СБОРКЕ GREGTECH: NEW HORIZONS</h2>
      </div>

      <div className="license-banner">
        <span className="license-banner-line"/>
        <div className="chamfer">
          <div className="chamfer-inner">
            ЛИЦЕНЗИЯ ВЫДАНА НА ПРАВО ИСПОЛЬЗОВАНИЯ
            <br/>
            МЕХАНИЗМОВ В КАЧЕСТВЕ СРЕДСТВА ДЛЯ ДЕФЕКАЦИИ
          </div>
        </div>
        <span className="license-banner-line"/>
      </div>

      <div className="license-columns">
        <div className="license-main">
          <dl className="license-fields">
            <dt><Gear/> ВЫДАНА:</dt>
            <dd className="nick">{nick}</dd>
            <dt><Gear/> СРОК ДЕЙСТВИЯ:</dt>
            <dd>{formatExpiry(expires)}</dd>
            <dt><Gear/> СТАТУС:</dt>
            <dd className={expired ? "status expired" : "status"}>{expired ? "Неактивна" : "Активна"}</dd>
            <dt><Gear/> РЕГИСТРАЦИОННЫЙ НОМЕР:</dt>
            <dd>{regNumber(nick)}</dd>
          </dl>

          <p className="license-statement">
            Настоящая лицензия подтверждает, что игрок <b>{nick}</b> имеет полное и неотъемлемое право
            использовать механизмы в качестве туалетного устройства в рамках сборки GregTech: New
            Horizons.
          </p>
          <p className="license-slogan">Срать — это не баг, это фича!</p>

          <div className="license-divider">
            <span/>
            <Gear/>
            <span/>
          </div>
        </div>

        <div className="license-permissions">
          <h3>ДАННАЯ ЛИЦЕНЗИЯ ПОЗВОЛЯЕТ:</h3>
          <ul>
            {PERMISSIONS.map((text) => (
              <li key={text}>
                <Check/>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="license-bottom">
        <QRCodeSVG
          value={buildVerifyUrl(props.data)}
          size={112}
          level="M"
          bgColor="transparent"
          fgColor="#14274a"
        />
        <p className="license-tagline">
          <b>GTNH</b> — где даже срать становится прогрессом.
        </p>
        <div className="license-signature">
          <Signature/>
          <span>Подпись представителя GTNH</span>
        </div>
      </div>

      <Stamp className="license-stamp" expired={expired}/>
      <GoldSeal className="license-seal"/>

      <footer className="license-footer">
        GREGTECH: NEW HORIZONS <span>|</span> {expires.slice(0, 4)}
      </footer>
    </div>
  );
}
