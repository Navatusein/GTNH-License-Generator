import {Link} from "react-router";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="site-logo" to="/">
        GTNH <span>Бюро лицензий</span>
      </Link>
    </header>
  );
}
