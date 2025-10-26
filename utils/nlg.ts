export function generateNarrative(input: { sector: string; location: string; capacity: string; usp: string; lang: 'en'|'te' }) {
  if (input.lang === 'te') {
    return `ఈ ప్రాజెక్ట్ రిపోర్ట్ ${input.location} లోని ${input.sector} రంగంలోని యాజమాన్యానికి సిద్ధం చేయబడింది. ఉత్పత్తి సామర్థ్యం ${input.capacity}. ప్రత్యేకత: ${input.usp}. మార్కెట్ డిమాండ్, సరఫరా గొలుసు మరియు ప్రభుత్వ పథకాలతో అనుసంధానం చేయబడింది.`;
  }
  return `This Detailed Project Report is prepared for an MSME in the ${input.sector} sector at ${input.location}. Planned capacity is ${input.capacity}. Unique value proposition: ${input.usp}. The plan aligns with demand, supply chain readiness, and applicable government schemes.`;
}
