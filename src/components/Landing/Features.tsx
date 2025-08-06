import { PenTool, Activity, Brain, BarChart3 } from 'lucide-react'
import {motion} from "motion/react"

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for mental wellness
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you understand and improve your emotional health through daily practice and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 *:cursor-pointer lg:grid-cols-4 gap-8">
            <motion.div 
            whileHover={{scale: 1.1}}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <PenTool className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Daily Journaling</h3>
              <p className="text-gray-600">A private, encrypted space for daily reflection and mindful writing to process your thoughts and emotions.</p>
            </motion.div>
            
            <motion.div 
            whileHover={{scale: 1.1}}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Wellness Tracking</h3>
              <p className="text-gray-600">Simple, intuitive sliders to track your daily mood, energy levels, and stress in just seconds.</p>
            </motion.div>
            
            <motion.div 
            whileHover={{scale: 1.1}}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">Advanced emotional analysis reveals hidden patterns in your writing, uncovering deeper insights about your wellbeing.</p>
            </motion.div>
            
            <motion.div 
            whileHover={{scale: 1.1}}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visual Trend Dashboards</h3>
              <p className="text-gray-600">Beautiful, interactive charts that make it easy to spot trends and understand your emotional journey over time.</p>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default Features