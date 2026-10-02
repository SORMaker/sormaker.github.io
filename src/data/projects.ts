export type Project = {
  slug: string; title: string; category: string; summary: string; role: string; result: string;
  tags: string[]; repository: string; image?: { src: string; alt: string }; video?: { src: string; label: string };
  problem: string; approach: { title: string; text: string }[]; evidence: string[]; limitations: string[];
};
export const PROJECTS: Project[] = [
  {
    slug: "act-dual-arm-manipulation", title: "ACT for Dual-Arm Manipulation", category: "Imitation learning · Simulation",
    summary: "Reproducing Action Chunking with Transformers (ACT) for four manipulation tasks, from bottle adjustment to three-bowl stacking. The project covers demonstration processing, policy training, and inference in simulation.",
    role: "Task configuration, data processing, and reproduction of the training and inference workflow.",
    result: "Reported T4 competition score: 64.3 / 100.",
    tags: ["ACT", "PyTorch", "Dual-arm manipulation", "Simulation"],
    repository: "https://github.com/SORMaker/troncamp-mani",
    video: { src: "/projects/act-t4.mp4", label: "Three-bowl stacking · Simulation recording" },
    problem: "Train a simulated Tron2 dual-arm robot to complete four progressively harder manipulation tasks using expert demonstrations. The tasks are bottle adjustment, dual-arm roller lifting, two-bowl stacking, and three-bowl stacking.",
    approach: [
      { title: "Prepare demonstrations", text: "Collect expert trajectories and convert observations and actions into the ACT data format. The policies use three camera views and a 16-dimensional robot state." },
      { title: "Train task-specific policies", text: "Configure and run the existing ACT training pipeline for each task. The repository documents distributed training for the three-bowl stacking task." },
      { title: "Run inference and evaluation", text: "Load trained policies through the competition evaluation interface and inspect simulation rollouts. The public repository includes task configurations and demonstration videos." }
    ],
    evidence: [
      "The repository reports scores of 59, 66, 74, and 64.3 for T1 through T4 respectively.",
      "The organizer's instructions distinguish T1–T3 qualification tasks from the T4 leaderboard task. T4 is graded by the final stacking state on a 100-point scale.",
      "The repository contains demonstration videos for two-bowl and three-bowl stacking. The recording below is a rollout example, not a success-rate measurement."
    ],
    limitations: [
      "This is a reproduction using an existing ACT implementation, not a new policy architecture.",
      "Simulation evaluation does not establish real-robot performance. The reported competition score describes graded final task completion, not a binary success rate."
    ]
  },
  {
    slug: "autonomous-off-road-bicycle", title: "Autonomous Off-road Bicycle", category: "Robot control · Team project",
    summary: "An autonomous bicycle combining INS/GNSS localization, B-spline route planning, and path tracking. Developed for the 18th National University Students Intelligent Car Race.",
    role: "Contributed to software design with Jasom_Wu; hardware design by ErBW_s.",
    result: "National First Prize · 3rd in the off-road bicycle category.",
    tags: ["INS / GNSS", "B-spline planning", "Path tracking", "Embedded systems"],
    repository: "https://github.com/SORMaker/CH32-Bike-Overland",
    image: { src: "/projects/bicycle.webp", alt: "The team's autonomous bicycle at the 2023 National University Students Intelligent Car Race" },
    problem: "Build an embedded robot that can localize, plan, and follow an off-road route on an autonomous bicycle platform in a national competition.",
    approach: [
      { title: "Localization", text: "Combine inertial navigation and GNSS information to estimate the bicycle's position along the route." },
      { title: "Route planning", text: "Use B-spline route planning to prepare a path for the vehicle to follow." },
      { title: "Path tracking", text: "Connect localization and route planning to embedded tracking control on the team's custom hardware platform." }
    ],
    evidence: [
      "The project README records a National First Prize and third place in the off-road bicycle category.",
      "The public repository provides software, hardware materials, and a photograph of the competition vehicle.",
      "The README credits SORMaker and Jasom_Wu for software design and ErBW_s for hardware design."
    ],
    limitations: [
      "This was a team project. The available documentation does not assign each individual algorithm to one software contributor.",
      "The README does not report quantitative tracking error, so no tracking-accuracy claim is made here."
    ]
  }
];
export const getProject = (slug: string) => PROJECTS.find(project => project.slug === slug);
