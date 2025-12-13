export function neighborhoodToString(neighborhood) {
  switch (neighborhood) {
    case 1:
      return "Sunray-Battlecreek-Highwood";
    case 2:
      return "Greater East Side";
    case 3:
      return "West Side";
    case 4:
      return "Dayton's Bluff";
    case 5:
      return "Payne-Phalen";
    case 6:
      return "North End";
    case 7:
      return "Frogtown";
    case 8:
      return "Summit-University";
    case 9:
      return "West Seventh/Ford Road";
    case 10:
      return "Como Park";
    case 11:
      return "Hamline Midway";
    case 12:
      return "Saint Anthony Park";
    case 13:
      return "Union Park";
    case 14:
      return "Macalester-Groveland";
    case 15:
      return "Highland Park";
    case 16:
      return "Summit Hill";
    case 17:
      return "Downtown";
  }
  return "Unknown";
}
