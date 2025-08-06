import { Heart } from 'lucide-react'


const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Wellbeing Tracker</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 Wellbeing Tracker. Made with care for your mental health.
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer