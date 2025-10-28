import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-brand dark:hover:text-brand-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && <span aria-hidden>&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
