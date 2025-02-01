export default function Card({ children, reverse = false}) {
  return (
    <div className={`card ${reverse && 'reverse'}`}>
      {children}
    </div>
  )
}