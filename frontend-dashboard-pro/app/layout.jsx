import "./globals.css";

export const metadata = {
  title: "TERANGA ULTRA Dashboard Pro",
  description: "Dashboard TERANGA ULTRA 50MW/200MWh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
