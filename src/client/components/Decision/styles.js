const baseStyle = {
  fontSize: "2em",
  borderRadius: 5,
  padding: 5,
  textAlign: "center"
}

export default function({ approve }) {
  const borderColor = approve ? "green" : "red"
  const border = `1px solid ${borderColor}`
  return { ...baseStyle, border }
}