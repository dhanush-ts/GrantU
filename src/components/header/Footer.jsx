const Footer = () => {
    return (
      <footer className="border-t border-gray-200 py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs">G</span>
                </div>
                <span className="font-bold text-lg text-purple-600">GrantU</span>
              </div>
              <span className="text-sm text-gray-500 ml-4">© 2025 GrantU. All rights reserved.</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="/about" className="text-sm text-gray-600 hover:text-purple-600">About</a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600">Terms</a>
              <a href="/contact" className="text-sm text-gray-600 hover:text-purple-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;