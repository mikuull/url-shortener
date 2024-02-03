import Link from "next/link";
import React from "react";

type ButtonProps = {
  title: string;
  href: string;
  property?: string;
};

const Button = ({ title, href, property }: ButtonProps) => {
  const className = `rounded-xl p-3 text-white bg-green-300 ${property}`;
  return (
    <>
      <Link href={href} className={className}>
        {title}
      </Link>
    </>
  );
};

export default Button;
