import Link from "next/link";
import navStyles from "./nav.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={navStyles.mainNav}>
        <div className={navStyles.logo}>
          <li>
          <Link href="/">
          <img src="/logo.png"></img>
          </Link>
        </li>
        </div>
        <div className={navStyles.links}>
          <li>
          <Link href="/books">Books</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/lbms">LBMS</Link>
        </li>
        </div>
        
      </ul>
    </nav>
  );
}