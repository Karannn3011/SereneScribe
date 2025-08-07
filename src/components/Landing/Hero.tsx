import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Herobg2 from "../../assets/herobg2.webp";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";


const Hero = () => {
  const { user } = useAuth();
  return (
    <div>
      <section
        className="bg-cover bg-top bg-fixed bg-no-repeat pt-28 pb-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${Herobg2})`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="md:text-5xl text-4xl font-bold text-black mb-6 leading-tight"
            >
              Understand Your Mind.<br />
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Master Your Wellbeing.
              </span>
            </motion.h1>
            <p className="md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              A smart health journal that combines daily reflection with
              AI-powered insights to help you discover patterns in your
              emotional wellbeing.
            </p>
            <Link to={user ? "/dashboard" : "/register"}>
              <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2">
                <span>Start My Journal</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
