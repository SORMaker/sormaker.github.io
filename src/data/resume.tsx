import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Zhengyang Xie",
  initials: "ZX",
  url: "https://sormaker.github.io",
  location: "Shenzhen, China",
  locationLink: "https://www.google.com/maps/place/shenzhen",
  description:
    "Master's student in Control Science and Engineering at SUSTech. I work on robot learning, manipulation, and control.",
  summary:
    "I'm a master's student in Control Science and Engineering at [Southern University of Science and Technology](/#education). My work spans [ACT-based manipulation in simulation](/#projects), adaptive estimation, and embedded robot control. Before SUSTech, I studied Automation at Donghua University, where I built autonomous vehicles for [national robotics and electronics competitions](/#honors). I'm currently looking for internship opportunities in robot learning and vision-language-action (VLA) systems.",
  avatarUrl: "/avatar.webp",
  skills: [
    { name: "Python", icon: Python },
    { name: "PyTorch" },
    { name: "C/C++", icon: Csharp },
    { name: "Imitation Learning" },
    { name: "Embedded Control" },
    { name: "PID Control" },
    { name: "Sensor Fusion" },
    { name: "Adaptive Estimation" },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "xiezy2025@mail.sustech.edu.cn",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/SORMaker",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:xiezy2025@mail.sustech.edu.cn",
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
      logoUrl: "",
      start: "Aug 2026",
      end: "Aug 2026",
      description:
        "My main contribution was data collection, including corrective demonstrations for the final placement stage of the flower-arranging task. Our team placed 5th in the offline competition.",
    },
    {
      company: "Frequency Estimation with an Unknown Bias",
      href: "https://www.sustech.edu.cn/en/",
      badges: [],
      location: "Shenzhen, China",
      title: "Research project · SUSTech",
      logoUrl: "/education/sustech.png",
      start: "2025",
      end: null,
      description:
        "Adaptive estimation of the unknown frequencies of discrete-time multi-tone sinusoidal signals with an unknown constant bias. The work extends a two-filter adaptive estimator through a modified characteristic-polynomial parameterization, establishes persistent excitation of the regressor (including the zero-bias case), and proves exponential convergence of the estimation errors. Comparative simulations examine bias handling, larger initial states, increased amplitudes, and normalization.",
    },
  ],
  education: [
    {
      school: "Southern University of Science and Technology",
      href: "https://www.sustech.edu.cn/en/",
      degree: "M.Eng. in Control Science and Engineering",
      logoUrl: "/education/sustech.png",
      start: "2025",
      end: "2028 (expected)",
    },
    {
      school: "Donghua University",
      href: "https://english.dhu.edu.cn/",
      degree: "B.Eng. in Automation",
      logoUrl: "/education/donghua.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "ACT for Dual-Arm Manipulation",
      href: "https://github.com/SORMaker/troncamp-mani",
      dates: "2026",
      active: true,
      description:
        "Reproduced Action Chunking with Transformers (ACT) on a simulated Tron2 dual-arm robot for four manipulation tasks, from bottle adjustment to three-bowl stacking. I configured tasks, processed demonstrations, and ran the training and inference workflow. T4 competition score: **64.3 / 100**.",
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
      title: "Autonomous Off-road Bicycle",
      href: "https://github.com/SORMaker/CH32-Bike-Overland",
      dates: "2023",
      active: true,
      description:
        "A self-balancing autonomous bicycle combining GPS–IMU fusion, B-spline route planning, and path tracking. I developed the CH32V307 control software, a three-stage cascade PID balance controller, and Mahony attitude estimation. **National First Prize**, 3rd place in the off-road bicycle category.",
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
      title: "Vision-and-Language Navigation",
      href: "https://github.com/SORMaker/VLN",
      dates: "Learning project",
      active: true,
      description:
        "A tutorial-based exploration of navigation from visual observations and language instructions, covering Matterport3D simulation, Seq2Seq training and evaluation, and MapGPT inference.",
      technologies: ["Python", "Matterport3D", "Seq2Seq", "MapGPT"],
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
      title: "TI Cup Vehicle Control",
      href: "https://github.com/SORMaker/2022TICup",
      dates: "2022",
      active: true,
      description:
        "Vehicle control on a TC264 microcontroller with PID speed control and encoder-based reversing and parking. I implemented the control code. **Shanghai First Prize**, Undergraduate Electronics Design Contest.",
      technologies: ["TC264", "PID", "Embedded Control"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/2022TICup",
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
      title: "Shanghai Municipal Scholarship",
      dates: "December 2023",
      location: "Shanghai Municipal Education Commission",
      description: "Top 2%",
      links: [],
    },
    {
      title: "National University Students Intelligent Car Race",
      dates: "September 2023",
      location: "Chinese Association of Automation",
      description: "National First Prize · 3rd place, off-road bicycle category.",
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
      description: "National First Prize and Shanghai First Prize.",
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
  ],
} as const;
