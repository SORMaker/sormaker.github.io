export const RESEARCH = {
  slug: "frequency-estimation",
  title: "Frequency Estimation with an Unknown Bias",
  manuscriptTitle: "Global Exponential Estimation of the Unknown Frequencies of Discrete-Time Multi-Tone Sinusoidal Signals with an Unknown Bias",
  authors: ["Zhengyang Xie", "Tao Liu"], status: "Research project",
  summary: "Adaptive estimation of unknown frequencies in discrete-time multi-tone signals with an unknown constant bias, with convergence analysis and comparative simulations.",
  sections: [
    { title: "Problem", text: "Estimate unknown frequencies of a sampled multi-tone sinusoidal signal when its constant bias is also unknown. The formulation covers signals with both nonzero and zero bias." },
    { title: "Method", text: "The work extends a two-filter adaptive estimator through a modified characteristic-polynomial parameterization. The analysis establishes persistent excitation of the regressor, including the zero-bias case." },
    { title: "Analysis", text: "Under the stated gain conditions, coefficient and output estimation errors converge exponentially. In the normalized design, these gain conditions do not depend on bounds on signal amplitudes or initial states." },
    { title: "Simulation study", text: "Comparative simulations examine bias handling, larger initial states, increased signal amplitudes, and the effect of normalization." }
  ]
};
