'use client'


export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="text-center">
                <div className="mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-24 h-24 text-blue-500 mx-auto animate-bounce"
                    >
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v5h-2V7zm0 7h2v2h-2v-2z" />
                    </svg>
                </div>
                <h1 className="text-7xl font-extrabold mb-4 text-blue-400">404</h1>
                <p className="text-2xl mb-4">Page Not Found</p>
                <p className="text-gray-400 mb-8">
                    Sorry, we couldn't find the page you're looking for. It may have been removed, renamed, or doesn't exist.
                </p>

                <a href="/" className="inline-block px-8 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                    Go Back Home
                </a>
            </div>
        </div>
    );
}
