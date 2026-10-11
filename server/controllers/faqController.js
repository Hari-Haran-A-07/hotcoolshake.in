export const getFaqs = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    const faqs = [
      {
        id: 'faq-tech-1',
        category: 'CHAMBER_X',
        categoryLabel: 'Chamber-X™ Thermodynamics',
        question: 'What is Chamber-X™ Thermodynamic Induction Technology?',
        answer: 'Chamber-X™ uses rapid electromagnetic induction to heat single-origin extractions to 68°C in 1.8 seconds, or cryogenic sonic vortex chilling to flash-cool beverages down to 04°C without ice dilution.',
      },
      {
        id: 'faq-tech-2',
        category: 'CHAMBER_X',
        categoryLabel: 'Chamber-X™ Thermodynamics',
        question: 'How do cryogenic drinks maintain 04°C during transit?',
        answer: 'All cool beverages are hermetically sealed inside double-walled thermal retention vessels and transported in climate-controlled electric pods with real-time IoT temperature telemetry.',
      },
      {
        id: 'faq-lab-1',
        category: 'LAB',
        categoryLabel: 'Virtual Coffee Lab',
        question: 'Can I customize my own coffee blend from scratch?',
        answer: 'Yes! In our Virtual Coffee Lab (/make-your-coffee), you can select your base vessel, choose single-origin bean bases, infuse exotic flavor particles, and dial in temperature, sweetness, and microfoam viscosity.',
      },
      {
        id: 'faq-lab-2',
        category: 'LAB',
        categoryLabel: 'Virtual Coffee Lab',
        question: 'Are your thermal bottles reusable?',
        answer: 'Yes, all HOT COOL SHAKE bottles are manufactured from food-grade recycled surgical titanium and aerospace vacuum insulation with lifetime refurbishment warranty.',
      },
      {
        id: 'faq-dispatch-1',
        category: 'DISPATCH',
        categoryLabel: 'Global Telemetry & Delivery',
        question: 'Where do you deliver and what are the delivery times?',
        answer: 'We operate flagship roasteries in London, New York, Tokyo, Dubai, Paris, and Singapore with a guaranteed 20-minute metropolitan radius delivery using our zero-emission electric vehicle fleet.',
      },
      {
        id: 'faq-rewards-1',
        category: 'REWARDS',
        categoryLabel: 'Inner Circle Rewards',
        question: 'How does the HOT COOL Inner Circle rewards system work?',
        answer: 'You earn 10 points for every dollar spent. Points can be redeemed for limited-edition seasonal roasts, titanium travel bottles, VIP tasting masterclasses, and secret off-menu creations.',
      },
    ];

    let results = faqs;
    if (category && category !== 'ALL') {
      results = results.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }

    res.json({
      success: true,
      count: results.length,
      faqs: results,
    });
  } catch (error) {
    next(error);
  }
};
