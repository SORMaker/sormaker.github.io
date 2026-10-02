import { Icons } from "@/components/icons";
import { BookOpenText, BrainCircuit, Combine, Cpu, HomeIcon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Cplusplus } from "@/components/ui/svgs/cplusplus";
import { PyTorch } from "@/components/ui/svgs/pytorch";
import { Ros } from "@/components/ui/svgs/ros";
import { Matlab } from "@/components/ui/svgs/matlab";
import { Git } from "@/components/ui/svgs/git";

export const DATA = {
  name: "Zhengyang Xie",
  initials: "ZX",
  url: "https://sormaker.github.io",
  location: "Shenzhen, China",
  locationLink: "https://www.google.com/maps/place/shenzhen",
  description:
    "Robotics master's student at SUSTech, working at the intersection of robot learning and control.",
  summary:
    "I'm a master's student in Control Science and Engineering at [Southern University of Science and Technology](/#education). My work spans robot learning and control: imitation learning for [dual-arm manipulation](/#projects), LLM agents for vision-and-language navigation, [grasp detection](/#publications), and adaptive estimation. Before SUSTech, I studied Automation at Donghua University, where I built self-balancing bicycles and vision-guided tracking systems that won [national first prizes](/#honors). I'm currently looking for internships in robot learning and vision-language-action (VLA) models.",
  avatarUrl: "/avatar.webp",
  skills: [
    { name: "Python", icon: Python },
    { name: "C/C++", icon: Cplusplus },
    { name: "PyTorch", icon: PyTorch },
    { name: "ROS", icon: Ros },
    { name: "MATLAB", icon: Matlab },
    { name: "Git", icon: Git },
    { name: "Imitation Learning", icon: BrainCircuit },
    { name: "Embedded Control", icon: Cpu },
    { name: "Sensor Fusion", icon: Combine },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog/", icon: BookOpenText, label: "Blog" },
  ],
  contact: {
    email: "xiezy3@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/SORMaker",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:xiezy3@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "TRON Camp 2026 · VLA Track",
      href: "https://github.com/SORMaker/troncamp-mani",
      badges: [],
      location: "Offline competition",
      title: "Team LIMY · 5th place",
      logoUrl: "/organizations/limx-dynamics.svg",
      start: "Aug 2026",
      end: "Aug 2026",
      description:
        "Led data collection for our VLA policy, including corrective demonstrations that targeted failures in the final placement stage of the flower-arranging task. Our team placed 5th in the offline competition.",
    },
    {
      company: "Frequency Estimation with an Unknown Bias",
      href: "https://www.sustech.edu.cn/en/",
      badges: [],
      location: "Shenzhen, China",
      title: "Research project · SUSTech",
      logoUrl: "/education/sustech.png",
      start: "Sep 2025",
      end: null,
      description:
        "Globally exponential estimation of the unknown frequencies of discrete-time multi-tone sinusoids with an unknown constant bias. I extended a two-filter adaptive estimator with a modified characteristic-polynomial parameterization, proved persistent excitation of the regressor (including the zero-bias case), and showed exponential convergence under gain conditions that, after normalization, do not depend on signal amplitudes or initial states. Comparative simulations cover bias handling, large initial states, and increased amplitudes.",
    },
  ],
  education: [
    {
      school: "Southern University of Science and Technology",
      href: "https://www.sustech.edu.cn/en/",
      degree: "M.Eng. in Control Science and Engineering",
      logoUrl: "/education/sustech.png",
      start: "Sep 2025",
      end: "Jun 2028",
    },
    {
      school: "Donghua University",
      href: "https://english.dhu.edu.cn/",
      degree: "B.Eng. in Automation",
      logoUrl: "/education/donghua.png",
      start: "Sep 2021",
      end: "Jun 2025",
    },
  ],
  projects: [
    {
      title: "ACT for Dual-Arm Manipulation",
      href: "https://github.com/SORMaker/troncamp-mani",
      dates: "2026",
      active: true,
      description:
        "Trained Action Chunking with Transformers (ACT) policies for a simulated Tron2 dual-arm robot on four tasks of increasing difficulty, from bottle adjustment to three-bowl stacking. I configured the tasks, converted expert demonstrations into the ACT format, and ran training and evaluation. Score of **64.3 / 100** on the final stacking task.",
      technologies: ["ACT", "PyTorch", "Dual-arm", "Simulation"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/troncamp-mani",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/act-t4-poster.webp",
      video: "/projects/act-t4.mp4",
    },
    {
      title: "Vision-and-Language Navigation",
      href: "https://github.com/SORMaker/VLN",
      dates: "Jan 2025 - Jun 2025",
      active: true,
      description:
        "Starting from an LSTM-with-attention Seq2Seq baseline in the Matterport3D simulator, I replaced the learned policy with an LLM agent and encoded the navigation graph's node connectivity as text prompts to improve spatial reasoning. The LLM agent achieved a **2.3×** higher success rate in unseen environments. This work later grew into [MD-Grasp](/#publications), published at PRCV 2025.",
      technologies: ["Python", "LLM Agents", "Matterport3D", "Seq2Seq"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/VLN",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Autonomous Off-road Bicycle",
      href: "https://github.com/SORMaker/CH32-Bike-Overland",
      dates: "Mar 2023 - Sep 2023",
      active: true,
      description:
        "A self-balancing bicycle that navigates outdoor terrain autonomously. On a RISC-V CH32V307 microcontroller, I implemented a three-stage cascade PID balance controller with angular-rate feedback to suppress servo jitter, Mahony attitude estimation, and GPS–IMU fusion for outdoor localization. **National First Prize**, 3rd place nationally.",
      technologies: ["CH32V307", "Cascade PID", "Sensor Fusion", "Embedded"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/CH32-Bike-Overland",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/bicycle.webp",
      video: "",
    },
    {
      title: "Laser Target Tracking System",
      href: "https://github.com/SORMaker/2023NUEDC",
      dates: "Aug 2023 - Sep 2023",
      active: true,
      description:
        "A vision-guided system in which a green laser automatically tracks a moving red-laser target. I implemented OpenMV detection to extract the target's real-time X/Y coordinates and built the communication link between the vision module and the tracking controller. **National First Prize**, Electronics Design Contest.",
      technologies: ["OpenMV", "Machine Vision", "Embedded Control"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/2023NUEDC",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  honors: [
    {
      title: "Shanghai Outstanding Graduate",
      dates: "June 2025",
      location: "Shanghai Municipal Education Commission",
      description: "",
      links: [],
    },
    {
      title: "China National Scholarship",
      dates: "December 2024",
      location: "Ministry of Education of the People's Republic of China",
      description: "Top 0.8%",
      links: [],
    },
    {
      title: "Shanghai Government Scholarship",
      dates: "December 2023",
      location: "Shanghai Municipal Education Commission",
      description: "Top 2%",
      links: [],
    },
    {
      title: "National University Students Intelligent Car Race",
      dates: "September 2023",
      location: "Chinese Association of Automation",
      description: "National First Prize (3rd place) with the self-balancing off-road bicycle.",
      win: "First Prize",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/SORMaker/CH32-Bike-Overland",
        },
      ],
    },
    {
      title: "National Undergraduate Electronics Design Contest",
      dates: "September 2023",
      location: "Ministry of Education · Ministry of Industry and Information Technology",
      description: "National First Prize and Shanghai First Prize with the laser target tracking system.",
      win: "First Prize",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/SORMaker/2023NUEDC",
        },
      ],
    },
    {
      title: "Shanghai Undergraduate Electronics Design Contest",
      dates: "November 2022",
      location: "Shanghai",
      description: "Shanghai First Prize.",
      win: "First Prize",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/SORMaker/2022TICup",
        },
      ],
    },
    {
      title: "Excellent Student",
      dates: "2021 - 2023",
      location: "Donghua University",
      description: "",
      links: [],
    },
  ],
  publications: [
    {
      title:
        "MD-Grasp: Background-Adaptive Grasp Detection for Real-time Robotic Manipulation Using Mamba and Attention Fusion Network",
      authors:
        "Futeng Liu, Diankai Sun, **Zhengyang Xie**, Jiacui Huang, Hongtao Zhang, Mingbo Zhao",
      venue: "Pattern Recognition and Computer Vision (PRCV)",
      year: "2025",
    },
  ],
} as const;
