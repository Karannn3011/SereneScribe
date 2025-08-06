import { ChevronRight } from 'lucide-react'

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to understand your mind?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who are already on their journey to better mental health. Start your free journal today.
          </p>
          <button className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2">
            <span>Start My Journal</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-blue-200 text-sm mt-4">Free to start • No credit card required • Private & secure</p>
        </div>
      </section>
  )
}

export default FinalCTA