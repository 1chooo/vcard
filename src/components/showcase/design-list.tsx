import type { ReactNode } from "react";

import styles from "@/styles/showcase/design-list.module.css";

interface DesignListItem {
  label: string;
  content: ReactNode;
}

function DesignList({ items }: { items: DesignListItem[] }) {
  return (
    <div className={styles.stack}>
      {items.map((item) => (
        <div key={item.label}>
          <p className={styles.label}>{item.label}</p>
          {item.content}
        </div>
      ))}
    </div>
  );
}

export { DesignList };
export default DesignList;
