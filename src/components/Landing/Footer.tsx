import logo from "../../assets/logo.svg"

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use a centered flex column layout */}
        <div className="flex px-4 flex-col md:flex-row justify-between items-center md:items-start gap-4">
          
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2">
                        <img src={logo} alt="SereneScribe" width={35} />
                        <span className="text-xl font-semibold text-gray-800">SereneScribe</span>
                      </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-2">About SereneScribe</h3>
            <p className="text-sm text-gray-600 max-w-md">
              SereneScribe is a personal journaling app that uses AI to help you discover emotional patterns and gain insights into your mental wellbeing.
              <a 
                href="https://github.com/your-username/your-repo" // <-- Add your GitHub repo link here
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline ml-1"
              >
                View on GitHub.
              </a>
            </p>
          </div>

          {/* Copyright and Personal Credit */}
          <div className="text-gray-500 text-sm text-center">
            <p>© 2025 SereneScribe. All Rights Reserved.</p>
            <p>
              Crafted with ❤️ by {/* Add your name or GitHub link here */}
              <a 
                href="https://github.com/Karannn3011" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                Karannn3011
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;