import Link from 'next/link';

interface LinkProps {
  href: string;
  text: string;
  classStr?: string;
  isFancy?: boolean;
}
export default function MyLink({ href, text, classStr, isFancy }: LinkProps) {
  return (
    <Link
      className={`group transition-all duration-300 ease-in-out relative ${classStr} pl-1 ${
        isFancy ? 'hover:text-bg' : 'hover:text-teal-500'
      } z-20`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {text}
      {isFancy && (
        <span className="absolute left-0 -bottom-0 w-full h-0.5 bg-teal-500 -z-10 group-hover:h-full group-hover:transition-all rounded-sm" />
      )}
    </Link>
  );
}
