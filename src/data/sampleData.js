const arborealProperties = [
  { name: "Betula House", location: "Seattle, WA", units: 50, type: "Development" },
  { name: "Cornus House", location: "Tacoma, WA", units: 199, type: "Development" },
  { name: "Taxus House", location: "Seattle, WA", units: 49, type: "Development" },
  { name: "Acer House", location: "Seattle, WA", units: 110, type: "Development" },
  { name: "Arbutus House", location: "Tacoma, WA", units: 200, type: "Development" },
  { name: "Quercus House", location: "Seattle, WA", units: 43, type: "Acquisition" },
  { name: "Salix House", location: "Seattle, WA", units: 17, type: "Acquisition" },
  { name: "Larix House", location: "Seattle, WA", units: 68, type: "Acquisition" },
  { name: "Engelmannii", location: "Seattle, WA", units: 105, type: "Acquisition" },
  { name: "Sitchensis", location: "Seattle, WA", units: 75, type: "Acquisition" },
  { name: "Alnus", location: "Seattle, WA", units: 300, type: "Acquisition" },
  { name: "Excelsa", location: "Seattle, WA", units: 43, type: "Acquisition" },
  { name: "Glauca", location: "Seattle, WA", units: 33, type: "Acquisition" },
  { name: "Omorika", location: "Seattle, WA", units: 24, type: "Acquisition" },
  { name: "Latifolia", location: "Portland, OR", units: 54, type: "Acquisition" },
  { name: "Dipetala", location: "Portland, OR", units: 54, type: "Acquisition" },
  { name: "Araucaria Garden", location: "Tukwila, WA", units: 25, type: "Development" }
];

// Seeded random for consistent data
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateSampleData() {
  const properties = arborealProperties.map((prop, index) => {
    const seed = index + 42;
    const vacancyRate = seededRandom(seed) * 0.12;
    const vacantUnits = Math.round(prop.units * vacancyRate);
    const avgDTL = 4 + seededRandom(seed + 1) * 20;

    let status = 'healthy';
    if (avgDTL >= 15) status = 'urgent';
    else if (avgDTL >= 8) status = 'watch';

    return {
      id: index + 1,
      name: prop.name,
      location: prop.location,
      type: prop.type,
      totalUnits: prop.units,
      vacantUnits,
      avgDaysToLease: parseFloat(avgDTL.toFixed(1)),
      status,
      pendingApplications: Math.floor(seededRandom(seed + 2) * 10),
      scheduledTours: Math.floor(seededRandom(seed + 3) * 8),
      lastUpdate: new Date().toISOString()
    };
  });

  const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);
  const totalVacant = properties.reduce((sum, p) => sum + p.vacantUnits, 0);
  const vacancyRate = (totalVacant / totalUnits) * 100;
  const avgDTL = properties.reduce((sum, p) => sum + p.avgDaysToLease, 0) / properties.length;

  return {
    properties,
    metrics: {
      totalUnits,
      vacancyRate: parseFloat(vacancyRate.toFixed(1)),
      avgDaysToLease: parseFloat(avgDTL.toFixed(1)),
      toursToday: 47,
      applicationsToday: 23,
      leasesSignedToday: 12
    }
  };
}

export function generateTrendData() {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseVacancy = 3.2;
    const variation = (seededRandom(i * 7) - 0.5) * 1.5;

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      vacancy: parseFloat((baseVacancy + variation).toFixed(1)),
      target: 3.0
    });
  }

  return data;
}

export function getRecommendedAction(property) {
  const { avgDaysToLease, vacantUnits, totalUnits } = property;
  const vacancyRate = (vacantUnits / totalUnits) * 100;

  if (avgDaysToLease > 20) {
    return "Schedule open house this weekend";
  } else if (avgDaysToLease > 15) {
    return "Review pricing strategy";
  } else if (avgDaysToLease > 10) {
    return "Follow up on pending applications";
  } else if (avgDaysToLease > 7) {
    return "Increase marketing spend";
  } else if (vacancyRate > 5 && avgDaysToLease <= 7) {
    return "Check unit condition and photos";
  }
  return "Maintain current strategy";
}

export function calculatePriority(property) {
  const { vacantUnits, totalUnits, avgDaysToLease } = property;
  let multiplier = 1;
  if (avgDaysToLease > 15) multiplier = 3;
  else if (avgDaysToLease >= 8) multiplier = 2;

  return (vacantUnits / totalUnits) * avgDaysToLease * multiplier;
}
