export const TabHeader = ({ title, subtitle, bgColor }) => {
  return (
    <div className={`${bgColor} text-white py-12 px-6 rounded-lg`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-lg opacity-90">{subtitle}</p>
      </div>
    </div>
  )
}
