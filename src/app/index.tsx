import "@fontsource/press-start-2p/latin-400.css";
import "@fontsource/press-start-2p/cyrillic-400.css";
import "@fontsource/tektur/latin-600.css";
import "@fontsource/tektur/cyrillic-600.css";
import "@fontsource/tektur/latin-700.css";
import "@fontsource/tektur/cyrillic-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "@fontsource/jetbrains-mono/cyrillic-700.css";
import "@/share/styles/styles.css";

import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router";
import Router from "@/app/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Router/>
  </HashRouter>
);
