// /client/src/components/PageFrame.jsx

export default function PageFrame({ sidebar, mainContent, pageName }) {
  const pageClassName = `page page--${pageName}`;
  const sidebarClassName = `sidebar sidebar--${pageName}`;
  const mainContentClassName = `main-content main-content--${pageName}`;

  return (
    <main className={pageClassName}>
      <aside className={sidebarClassName}>{sidebar}</aside>
      <div className={mainContentClassName}>{mainContent}</div>
    </main>
  );
}
