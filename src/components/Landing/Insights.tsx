import { motion } from "motion/react"

const Insights = () => {
  return (
    <section className="py-20 z-1 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Beautiful insights, backed by AI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See your emotional journey come to life with stunning visualizations and AI-powered analysis that reveals patterns you never knew existed.
            </p>
          </div>
          
          {/* Dashboard Mockup */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-500">wellbeingtracker.app/dashboard</div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mood Chart */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trends (Last 30 Days)</h3>
                  <div className="h-48 flex items-end space-x-2">
                    {[65, 72, 58, 80, 75, 85, 78, 82, 70, 88, 92, 87, 79, 85].map((height, i) => (
                      <motion.div
                      whileHover={{ height: `${height+5}%` }}
                        key={i}
                        className="cursor-pointer bg-gradient-to-t from-blue-400 to-green-400 rounded-t flex-1"
                        style={{ height: `${height}%` }}
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Emotion Distribution */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Emotions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Joy</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Calm</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">72%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Focus</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">68%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Insight</h3>
                  <p className="text-sm text-gray-600">Your energy levels peak on Tuesdays and Wednesdays. Consider scheduling important tasks during these days for optimal performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Insights