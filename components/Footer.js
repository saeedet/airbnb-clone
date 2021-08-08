import React from "react";

function Footer() {
  const footerOptions = (title, options) => (
    <div className="space-y-4 text-xs text-gray-800 text-center md:text-left border-t-2 pt-2 md:pt-0 md:border-none">
      <h5 className="font-bold">{title}</h5>
      {options.map((item) => (
        <p
          key={Math.random()}
          className="cursor-pointer hover:underline whitespace-nowrap"
        >
          {item}
        </p>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      {footerOptions("ABOUT", [
        "How Airbnb works",
        "Newsroom",
        "Investors",
        "Airbnb Plus",
        "Airbnb Luxe",
      ])}
      {footerOptions("COMMUNITY", [
        "Diversity & Belonging",
        "Accessibility",
        "Airbnb Associates",
        "Frontline Stays",
        "Guest Referrals",
      ])}
      {footerOptions("HOST", [
        "Host your home",
        "Host an Online Experience",
        "Host an Experience",
        "Responsible hosting",
        "Resource Centre",
      ])}
      {footerOptions("SUPPORT", [
        "Our COVID-19 Response",
        "Help Centre",
        "Cancellation options",
        "Neighbourhood Support",
        "Trust & Safety",
      ])}
    </div>
  );
}

export default Footer;
