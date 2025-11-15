import Link from "next/link";
import type { FooterLink } from "@/types";

interface FooterProps {
  logoText?: string;
  copyright?: string;
  footerLinks?: FooterLink[];
  socialLinks?: Array<{ name: string; href: string; icon: string }>;
}

export default function Footer({
  logoText = "KFastest",
  copyright = `© ${new Date().getFullYear()} ${logoText}. All rights reserved.`,
  footerLinks = [],
  socialLinks = [],
}: FooterProps) {
  const defaultFooterLinks: FooterLink[] =
    footerLinks.length > 0
      ? footerLinks
      : [
          {
            title: "Company",
            links: [
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Blog", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "Support", href: "/support" },
            ],
          },
        ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">{logoText}</h3>
            <p className="text-gray-400 mb-4">
              Fast, modern, and reliable web solutions built with Next.js and
              TypeScript.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Links */}
          {defaultFooterLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
