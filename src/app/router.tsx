import {Navigate, Route, Routes} from "react-router";
import {BaseLayout} from "@/app/layouts/base-layout";
import {VERIFY_PATH} from "@/entities/license";
import {GeneratorView} from "@/views/generator";
import {VerifyView} from "@/views/verify";
import {NotFoundView} from "@/views/not-found";

export default function Router() {
  return (
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route index path="/" element={<GeneratorView/>}/>
        <Route path={VERIFY_PATH} element={<VerifyView/>}/>
        <Route path="/404" element={<NotFoundView/>}/>
        <Route path="*" element={<Navigate to="/404" replace/>}/>
      </Route>
    </Routes>
  );
}
