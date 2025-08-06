import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
const NavBar = () => {
  return (
    <nav className="absolute top-0 w-full bg-gradient-to-b from-black/40 to-transparent backdrop-opacity-50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Wellbeing Tracker</span>
            </div>
            </Link>
            <div className="flex gap-6">
            <Button className=" text-white font-semibold" asChild variant="link">
              <Link to="/login"><p className="text-lg">Login</p></Link>
            </Button>
            <Button className="hover:bg-blue-500 hover:text-white text-lg text-white font-semibold" asChild variant="ghost">
              <Link to="/register">Sign Up</Link>
            </Button>
            </div>
            
          </div>
        </div>
      </nav>
  )
}

export default NavBar