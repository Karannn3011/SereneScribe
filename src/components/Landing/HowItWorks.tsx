import { PenTool, TrendingUp, Zap } from "lucide-react";
import hiwbg from "../../assets/hiwbg.webp";
import {motion} from "motion/react"

const HowItWorks = () => {
  return (
    <section
      className="py-20 bg-cover bg-center bg-fixed backdrop"
      style={{
        backgroundImage: `url(${hiwbg})`,
      }}
    >
      <div className="max-w-7xl bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="max-w-max mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">
  How it works
</h2>
          </div>

          <p className="text-lg mt-4 text-white font-semibold [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto">
            Start your journey to better mental health in three simple steps. It
            takes less than 5 minutes a day.
          </p>
        </div>
      <div className="overflow-x-scroll md:overflow-x-hidden">
        <div className="flex flex-row w-[300vw] md:w-auto md:grid md:grid-cols-3 gap-12 *:bg-white/80 *:rounded-xl *:p-4">
        <motion.div
          initial={{transform: "translateX(-100px)"}}
          whileInView={{transform: "translateX(0px)"}}
          transition={{duration: 0.3}}
          className="text-center">
          
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-semibold text-blue-600 mb-2">
              STEP 1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Write Your Thoughts
            </h3>
            <p className="text-gray-600">
              Express yourself freely in your private, secure journal. Write
              about your day, feelings, or anything on your mind.
            </p>
          </motion.div>

          <div 
          className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-semibold text-green-600 mb-2">
              STEP 2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Track Your Feelings
            </h3>
            <p className="text-gray-600">
              Use simple sliders to quickly log your mood, energy, and stress
              levels. Takes just a few seconds each day.
            </p>
          </div>

          <motion.div 
          initial={{transform: "translateX(100px)"}}
          whileInView={{transform: "translateX(0px)"}}
          transition={{duration: 0.3}}
          className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-semibold text-purple-600 mb-2">
              STEP 3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Discover Your Patterns
            </h3>
            <p className="text-gray-600">
              Our AI analyzes your entries to reveal emotional insights and
              trends, helping you understand your mental wellness journey.
            </p>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
