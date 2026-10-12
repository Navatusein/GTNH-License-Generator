import "./license-preview.css";

import type {Ref} from "react";
import {useElementWidth} from "@/share/hooks/use-element-width.ts";
import type {LicenseData} from "../../../../types/type";
import {LICENSE_HEIGHT, LICENSE_WIDTH, LicenseCard} from "../../../license-card";

interface IProps {
  data: LicenseData;
  /** Ref to the unscaled license node, e.g. for exporting it as an image */
  cardRef?: Ref<HTMLDivElement>;
}

export default function LicensePreview(props: IProps) {
  const {ref, width} = useElementWidth<HTMLDivElement>();
  const scale = width / LICENSE_WIDTH;

  return (
    <div ref={ref} className="license-preview" style={{height: LICENSE_HEIGHT * scale}}>
      <div className="license-preview-scaler" style={{transform: `scale(${scale})`}}>
        <LicenseCard data={props.data} ref={props.cardRef}/>
      </div>
    </div>
  );
}
