"use client";

import { useState } from "react";
import { motion } from "motion/react";

import styles from "@/styles/showcase/navbar-preview.module.css";

const links = [
  { label: "About", path: "/" },
  { label: "Resume", path: "/resume" },
  { label: "Project", path: "/project" },
  { label: "Blog", path: "/blog" },
];

function ClassicNav() {
  const [activePath, setActivePath] = useState("/");

  return (
    <div className={styles.bar}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.path}>
            <button
              type="button"
              onClick={() => setActivePath(link.path)}
              className={
                link.path === activePath ? styles.classicActive : styles.classicLink
              }
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CurrentNav() {
  const [activePath, setActivePath] = useState("/");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className={styles.bar}>
      <ul className={styles.list}>
        {links.map((link) => {
          const active = link.path === activePath;
          const hovered = hoveredPath === link.path;

          return (
            <li key={link.path}>
              <button
                type="button"
                onClick={() => setActivePath(link.path)}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className={styles.currentLink}
                style={{
                  color: active ? "#fff" : "#888888",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {link.label}
                {hovered && (
                  <motion.div
                    layoutId="showcase-nav-hover-bg"
                    className={styles.hoverBg}
                  />
                )}
                {active && (
                  <motion.div
                    layoutId="showcase-nav-active"
                    className={styles.activeLine}
                  />
                )}
                {hovered && (
                  <motion.div
                    layoutId="showcase-nav-hover"
                    className={styles.hoverLine}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { ClassicNav, CurrentNav };
