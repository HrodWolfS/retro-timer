import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const pixelFont2 = VT323({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Timer",
  description: "Timer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={pixelFont2.className}>{children}</body>
    </html>
  );
}
