export const DATA = {
  name: "Zhengyang Xie", initials: "ZX", avatarUrl: "/avatar.webp",
  description: "Master's student in Control Science and Engineering at SUSTech, with experience in robot control, embedded systems, and imitation learning.",
  summary: "My work spans autonomous navigation, ACT-based manipulation in simulation, and adaptive estimation. I am looking for internship opportunities in robot learning and vision-language-action (VLA) systems.",
  focus: "Seeking internships in robot learning & VLA",
  resumeUrl: null as string | null,
  contact: { email: "xiezy2025@mail.sustech.edu.cn", github: "https://github.com/SORMaker" },
  experience: [{
    title: "TRON Camp 2026 · VLA track", organization: "Team LIMY · Offline competition", date: "Aug. 3–7, 2026",
    description: "My main contribution was data collection, including corrective demonstrations for the final placement stage of the flower-arranging task.",
    result: "Team result: 5th place in the offline competition."
  }],
  education: [
    { school: "Southern University of Science and Technology", logoUrl: "/education/sustech.png", degree: "M.Eng. in Control Science and Engineering", date: "Expected Jun. 2028" },
    { school: "Donghua University", logoUrl: "/education/donghua.png", degree: "B.Eng. in Automation", date: "Sep. 2021 – Jun. 2025" }
  ],
  skills: [
    { category: "Robot learning", items: ["Python", "PyTorch", "ACT reproduction", "Simulation evaluation"] },
    { category: "Control & systems", items: ["Embedded control", "Path tracking", "Adaptive estimation"] },
    { category: "Robot data", items: ["Expert demonstrations", "Data processing", "Corrective data collection"] }
  ],
  honors: [
    { title: "Shanghai Outstanding Graduate", date: "2025" },
    { title: "China National Scholarship", date: "2024" },
    { title: "National First Prize · Intelligent Car Race", date: "2023" },
    { title: "National First Prize · Electronics Design Contest", date: "2023" }
  ]
};
