export function capitalizeText(text: string) {
  if (!text) {
    return "Main";
  }
  if (text === "statsd") {
    return "StatsD";
  }
  return text.toLowerCase()
    .replace(/\w/, capital => capital.toUpperCase());
}
