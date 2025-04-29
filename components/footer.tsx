
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Apollo Clone. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
