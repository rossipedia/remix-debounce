import { NavLink, NavLinkProps, Outlet } from '@remix-run/react';
import clsx from 'clsx';

export default function Component() {
  return (
    <div className="max-w-[640px] flex flex-col mx-auto gap-4">
      <h1 className="flex flex-row items-center gap-4">
        <img
          src="/remix-letter-glowing.svg"
          alt="Remix Logo"
          className="h-[1em]"
        />
        Debouncing in Remix
      </h1>
      <nav className="flex flex-row list-none gap-4">
        <NavMenuLink to="/">Home</NavMenuLink>
        <NavMenuLink to="/declarative">Declarative</NavMenuLink>
        <NavMenuLink to="/imperative">Imperative</NavMenuLink>
        <NavMenuLink to="/ideal">Ideal</NavMenuLink>
      </nav>
      <Outlet />
    </div>
  );
}

function NavMenuLink(props: NavLinkProps) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(
            'transition-colors block px-2 py-1 border  rounded no-underline border-solid',
            isActive
              ? 'text-blue-500 bg-blue-100 border-blue-300 dark:text-blue-200 dark:bg-blue-800 dark:border-blue-700'
              : 'text-slate-600 bg-slate-200 dark:text-slate-400 dark:bg-slate-800 border-slate-200 dark:border-slate-800'
          )
        }
        {...props}
      />
    </li>
  );
}
