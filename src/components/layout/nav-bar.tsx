"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { fadeUp } from "@/components/animations/fade-up";

import "@/styles/nav-bar.css";

const NavBar = () => {
  const currentPath = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/blog" && currentPath.startsWith("/blog")) return true;
    if (path === "/portfolio" && currentPath.startsWith("/portfolio"))
      return true;
    if (path === "/project" && currentPath.startsWith("/project")) return true;
    if (path === "/post" && currentPath.startsWith("/post")) return true;
    if (path === "/resume" && currentPath.startsWith("/resume")) return true;
    return currentPath === path;
  };

  const handleNavClick = (label: string, path: string) => {
    // Umami tracking
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("Switch Navigation Tab", {
        label,
        path,
      });
    }
    // Google Analytics tracking
    sendGTMEvent({
      event: "switch_navigation_tab",
      value: path,
      nav_label: label,
    });
  };

  return (
    <fadeUp.div className="navbar">
      <ul className="flex items-center justify-center navbar-list">
        <li className="py-2 navbar-item">
          <ViewTransitionsProgressBarLink
            href="/"
            onClick={() => handleNavClick("About", "/")}
            onMouseEnter={() => setHoveredPath("/")}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:text-orange-yellow-crayola!"
            style={{
              color: isActive("/") ? "#FFF" : "#888888",
              fontWeight: isActive("/") ? 700 : 500,
            }}
          >
            About

            {hoveredPath === "/" && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
              />
            )}

            {isActive("/") && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
              />
            )}

            {hoveredPath === "/" && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </ViewTransitionsProgressBarLink>
        </li>

        <li className="py-2 navbar-item">
          <ViewTransitionsProgressBarLink
            href="/resume"
            onClick={() => handleNavClick("Resume", "/resume")}
            onMouseEnter={() => setHoveredPath("/resume")}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:text-orange-yellow-crayola!"
            style={{
              color: isActive("/resume") ? "#FFF" : "#888888",
              fontWeight: isActive("/resume") ? 700 : 500,
            }}
          >
            Resume

            {hoveredPath === "/resume" && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
              />
            )}

            {isActive("/resume") && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
              />
            )}

            {hoveredPath === "/resume" && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </ViewTransitionsProgressBarLink>
        </li>

        <li className="py-2 navbar-item">
          <ViewTransitionsProgressBarLink
            href="/project"
            onClick={() => handleNavClick("Project", "/project")}
            onMouseEnter={() => setHoveredPath("/project")}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:text-orange-yellow-crayola!"
            style={{
              color: isActive("/project") ? "#FFF" : "#888888",
              fontWeight: isActive("/project") ? 700 : 500,
            }}
          >
            Project

            {hoveredPath === "/project" && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
              />
            )}

            {isActive("/project") && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
              />
            )}

            {hoveredPath === "/project" && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </ViewTransitionsProgressBarLink>
        </li>

        <li className="py-2 navbar-item">
          <ViewTransitionsProgressBarLink
            href="/blog"
            onClick={() => handleNavClick("Blog", "/blog")}
            onMouseEnter={() => setHoveredPath("/blog")}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:text-orange-yellow-crayola!"
            style={{
              color: isActive("/blog") ? "#FFF" : "#888888",
              fontWeight: isActive("/blog") ? 700 : 500,
            }}
          >
            Blog

            {hoveredPath === "/blog" && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
              />
            )}

            {isActive("/blog") && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
              />
            )}

            {hoveredPath === "/blog" && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </ViewTransitionsProgressBarLink>
        </li>

        {/* <li className="py-2 navbar-item">
          <ViewTransitionsProgressBarLink
            href="/gallery"
            onClick={() => handleNavClick("Gallery", "/gallery")}
            onMouseEnter={() => setHoveredPath("/gallery")}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative block px-2 py-2 text-sm md:text-base lg:text-base duration-300 transition-colors hover:text-orange-yellow-crayola!"
            style={{
              color: isActive("/gallery") ? "#FFF" : "#888888",
              fontWeight: isActive("/gallery") ? 700 : 500,
            }}
          >
            Gallery

            {hoveredPath === "/gallery" && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
              />
            )}

            {isActive("/gallery") && (
              <motion.div
                layoutId="active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-yellow-crayola"
              />
            )}

            {hoveredPath === "/gallery" && (
              <motion.div
                layoutId="hover"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              />
            )}
          </ViewTransitionsProgressBarLink>
        </li> */}
      </ul>
    </fadeUp.div>
  );
};

export default NavBar;
export { NavBar };
