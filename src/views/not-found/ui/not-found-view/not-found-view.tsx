import {Link} from "react-router";

export default function NotFoundView() {
  return (
    <section className="panel" style={{maxWidth: 520, margin: "0 auto", textAlign: "center"}}>
      <h1>404</h1>
      <p className="muted-text" style={{margin: "12px 0 20px"}}>
        Такой страницы нет. Возможно, её засрали механизмами.
      </p>
      <Link className="button" to="/" replace>
        На главную
      </Link>
    </section>
  );
}
