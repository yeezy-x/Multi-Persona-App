import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

function RootLayout({children}:{children:React.ReactNode}) {
    return (
        <html>
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout;