export async function getWeekendRecommendations() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      day: "Friday",
      venue: "Skyline Lounge",
      time: "8:00 PM",
      location: "Downtown",
      crowd: "Moderate",
      tags: ["Cocktails", "City View", "Live Music"],
    },
    {
      day: "Saturday",
      venue: "Neon Club",
      time: "10:00 PM",
      location: "City Center",
      crowd: "High",
      tags: ["EDM", "Dance Floor", "VIP Tables"],
    },
    {
      day: "Sunday",
      venue: "Velvet Underground",
      time: "7:00 PM",
      location: "Arts District",
      crowd: "Low",
      tags: ["Jazz", "Intimate", "Craft Beer"],
    },
  ]
}
