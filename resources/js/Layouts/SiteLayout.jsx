import Header from '@/Components/Layout/Header';
import Footer from '@/Components/Layout/Footer';

export default function SiteLayout({ children }) {
    return (
        <div className="site-shell">
            <Header />
            <main id="main" className="site-main">
                {children}
            </main>
            <Footer />
        </div>
    );
}
