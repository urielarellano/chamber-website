"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import smallLogo from "@/public/chamber-logo-small.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { name: "New Calendar Format!", href: "/events/calendar" },
    { name: "Home", href: "/" },
    { name: "Directory", href: "/directory" },
    { name: "About the Chamber",
      dropdown: [
        { name: "About Us", href: '/about/about-us'},
        { name: "Chamber Staff & Officers", href: "/about/staff" },
        { name: "Board of Directors", href: "/about/directors" },
        { name: "Ambassadors", href: "/about/ambassadors" },
        { name: "Past Chamber Presidents", href: "/about/past-presidents" },
      ]
    },
    { name: "Job Postings", href: "/job-postings" },
    { name: "Events",
      dropdown: [
        { name: "Events List", href: "/events/list" },
        { name: "Events Calendar", href: "/events/calendar" },
      ]
     },
     { name: "New! Chamber Spotlights", href: "/chamber-spotlights" },
     { name: "Memberships",
      dropdown: [
        { name: "Rate Structure", href: "/membership/rates" },
        { name: "Become a Member", href: "/membership/become-member" },
      ]
     },
     { name: "Awards",
      dropdown: [
        { name: "Kelly Lewis Memorial Award", href: "/awards/kelly-lewis" },
        { name: "Sweet Corn Festival Volunteer of the Year", href: "/awards/sweet-corn-volunteer" },
        { name: "Beautification Award", href: "/awards/beautification" },
        { name: "Horace Hume Oustanding Service", href: "/awards/horace-hume" },
        { name: "Tom Merwin Gold Star Employee", href: "/awards/tom-merwin" },
      ]
     },
     { name: "Helpful Links",
      dropdown: [
        { name: 'Hi Neighbor Coupon Book', href: 'https://www.youtube.com/watch?v=rRPQs_kM_nw' },
        { name: 'Mendota Community Profile', href: 'https://chambermaster.blob.core.windows.net/userfiles/UserFiles/chambers/1338/CMS/MendotaGuide_2023.pdf' },
        { name: 'Amtrak Schedule', href: 'https://asm.transitdocs.com/station/MDT' },
        { name: 'Sweet Corn Festival', href: 'https://sweetcornfestival.com/' },
        { name: 'History of Mendota', href: '/helpful-links/mendota-history' },
        { name: 'City of Mendota', href: 'https://www.mendota.il.us/' },
        { name: 'Weather', href: '/helpful-links/weather' },
        { name: 'La Salle County Tourism', href: 'https://enjoylasallecounty.com/' },
      ]
     },
     { name: 'Contact Us', href: '/contact'},
     { name: 'Your Business Needs Survey', href: 'https://docs.google.com/forms/d/e/1FAIpQLSeDaKT69E1ge5_9qxTq1hdsbx9gLUWeF24ae3geX-AZyKvj5A/viewform'},
     { name: 'Sweet Corn Festival', href: 'https://sweetcornfestival.com/'}
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header>
      <div className="header-items">
        {/* Logo */}
        <Link href="/">
          <Image src={smallLogo} alt="chamber logo"
            className="md:h-15 h-12 w-auto object-contain"
          />
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className="block h-0.5 bg-black"></span>
            <span className="block h-0.5 bg-black"></span>
            <span className="block h-0.5 bg-black"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu
          ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-4 space-y-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name}>
                {/* mobile nav dropdown item */}
                <button className="w-full text-left py-1 font-medium"
                  onClick={() => toggleDropdown(item.name)}
                >
                  {item.name}&#9662;
                </button>

                {/* mobile dropdown */}
                {openDropdown === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      // mobile dropdown item
                      <SmartLink key={subItem.name} href={subItem.href}
                        className="block py-1 text-sm text-gray-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {subItem.name}
                      </SmartLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // mobile nav item
              <SmartLink key={item.name} href={item.href!} className="block py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </SmartLink>
            )
          )}
        </div>
        
      </div>
      {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative group">
                {/* desktop nav item */}
                <button className="hover:text-blue-500 transition-150">
                  {item.name}&#9662;
                </button>

                {/* Dropdown */}
                <div className="dropdown">
                  {item.dropdown.map((subItem) => (
                    <SmartLink key={subItem.name} href={subItem.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {subItem.name}
                    </SmartLink>
                  ))}
                </div>
              </div>
            ) : (
              // desktop nav item
              <SmartLink key={item.name} href={item.href!} className="hover:text-blue-500 transition">
                {item.name}
              </SmartLink>
            )
          )}
        </nav>
    </header>
  );
}


// helper functions

function SmartLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("//") ||
    href.endsWith(".pdf");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}