import type {ReactNode} from "react";
import {Outlet} from "react-router";
import {Header} from "@/widgets/header";
import {Footer} from "@/widgets/footer";

interface IProps {
  children?: ReactNode;
}

export default function BaseLayout(props: IProps) {
  return (
    <div className="site-layout">
      <Header/>
      <main className="site-content">
        {props.children ?? <Outlet/>}
      </main>
      <Footer/>
    </div>
  );
}
