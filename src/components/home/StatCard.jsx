import CountUp from "../ui/CountUp/CountUp"

export default function StatCard({ icon, value, label, prefix = "", suffix = "+", duration = 2.5 }) {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow-md px-8 py-10 w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          {icon && (
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">{icon}</div>
            </div>
          )}
          <div className="text-4xl font-bold text-purple-600 mb-2">
            <span className="text-purple-500">{prefix}</span>
            <CountUp
              from={0}
              to={value}
              separator=","
              direction="up"
              duration={duration}
              className="text-5xl font-extrabold"
            />
            <span className="text-purple-500">{suffix}</span>
          </div>
          <p className="text-gray-600 font-medium">{label}</p>
        </div>
      </div>
    </div>
  )
}
