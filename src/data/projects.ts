export type Project = {
  slug: string; title: string; category: string; summary: string; detailSummary?: string; role: string; result: string;
  tags: string[]; repository: string; image?: { src: string; alt: string }; video?: { src: string; label: string; poster?: string; posterAlt?: string };
  problem: string; approach: { title: string; text: string }[]; evidence: string[]; limitations: string[];
};
export const PROJECTS: Project[] = [
  {
    slug: "act-dual-arm-manipulation", title: "ACT for Dual-Arm Manipulation", category: "Imitation learning · Simulation",
    summary: "ACT reproduction for robot manipulation, covering demonstration processing, policy training, and simulation evaluation.",
    detailSummary: "I reproduced a demonstration-to-policy workflow for the Tron2 robot, using task-specific configurations to train and evaluate ACT policies in simulation.",
    role: "I configured tasks, processed demonstrations, and reproduced the training and inference workflow.",
    result: "Four manipulation tasks · T4 competition score: 64.3 / 100.",
    tags: ["ACT", "PyTorch", "Dual-arm manipulation", "Simulation"],
    repository: "https://github.com/SORMaker/troncamp-mani",
    video: {
      src: "/projects/act-t4.mp4", label: "Three-bowl stacking · Simulation recording",
      poster: "/projects/act-t4-poster.webp", posterAlt: "Robot gripper handling a bowl during a three-bowl stacking task in simulation"
    },
    problem: "Train a simulated Tron2 dual-arm robot to complete four progressively harder manipulation tasks using expert demonstrations. The tasks are bottle adjustment, dual-arm roller lifting, two-bowl stacking, and three-bowl stacking.",
    approach: [
      { title: "Prepare demonstrations", text: "Collect expert trajectories and convert observations and actions into the ACT data format. The policies use three camera views and a 16-dimensional robot state." },
      { title: "Train task-specific policies", text: "Configure and run the existing ACT training pipeline for each task." },
      { title: "Run inference and evaluation", text: "Load trained policies through the competition evaluation interface and inspect simulation rollouts." }
    ],
    evidence: [
      "Qualification-task scores were 59 (T1), 66 (T2), and 74 (T3).",
      "T1–T3 were qualification tasks; T4 was the leaderboard task, scored from the final stacking state on a 100-point scale."
    ],
    limitations: [
      "Based on an existing ACT implementation and evaluated in simulation."
    ]
  },
  {
    slug: "autonomous-off-road-bicycle", title: "Autonomous Off-road Bicycle", category: "Robot control · Team project",
    summary: "An autonomous bicycle that combines INS/GNSS localization, B-spline route planning, and embedded path tracking.",
    role: "I contributed to software design with Jasom_Wu, and ErBW_s designed the hardware.",
    result: "National First Prize · 3rd place, Off-road Bicycle Category (2023).",
    tags: ["INS / GNSS", "B-spline planning", "Path tracking", "Embedded systems"],
    repository: "https://github.com/SORMaker/CH32-Bike-Overland",
    image: { src: "/projects/bicycle.webp", alt: "The team's autonomous bicycle at the 2023 National University Students Intelligent Car Race" },
    problem: "Build an embedded robot that can localize, plan, and follow an off-road route on an autonomous bicycle platform in a national competition.",
    approach: [
      { title: "Localization", text: "Combine inertial navigation and GNSS information to estimate the bicycle's position along the route." },
      { title: "Route planning", text: "Use B-spline route planning to prepare a path for the vehicle to follow." },
      { title: "Path tracking", text: "Connect localization and route planning to embedded tracking control on the team's custom hardware platform." }
    ],
    evidence: [],
    limitations: []
  }
];
export const getProject = (slug: string) => PROJECTS.find(project => project.slug === slug);
