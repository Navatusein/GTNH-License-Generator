export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      Бюро лицензий GTNH ©{currentYear} · Шуточный фан-проект, не связан с командой GregTech: New Horizons
    </footer>
  );
}
