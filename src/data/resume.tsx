import { Icons } from "@/components/icons";
import { BookOpenText, HomeIcon } from "lucide-react";

export type Project = {
  title: string;
  /** Source repository. */
  href: string;
  dates: string;
  /** Markdown. */
  description: string;
  technologies: string[];
  image: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  video?: string;
};

export type Honor = {
  title: string;
  dates: string;
  organization: string;
  description?: string;
  /** Competition prizes get a trophy icon; scholarships and titles an award icon. */
  competition?: boolean;
  source?: string;
};

export const DATA = {
  name: "Zhengyang Xie",
  initials: "ZX",
  url: "https://sormaker.github.io",
  description:
    "Master's student at SUSTech working on robot learning.",
  summary:
    "I'm a master's student in Control Science and Engineering at [SUSTech](/#education). I'm interested in how robots learn manipulation skills from demonstrations, and in what it takes to make those skills hold up on real hardware.\n\nMost recently, I collected teleoperation data for a multi-task VLA policy on the TRON2 dual-arm robot at [TRON Camp 2026](/#projects), where our team placed 2nd in table clearing and 5th overall. Before that, I explored LLM-based planning for vision-and-language navigation and co-authored [MD-Grasp](/#publications), a real-time grasp detection network (PRCV 2025).\n\nMy foundation is in control. At Donghua University, I built a self-balancing autonomous bicycle and a vision-guided laser tracking system — both won [national first prizes](/#honors). I'm currently looking for **internships in embodied AI and VLA**.",
  // TODO(补充): 头像目前是卡通狗，求职用可换成真人照片
  avatarUrl: "/avatar.webp",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog/", icon: BookOpenText, label: "Blog" },
  ],
  // TODO(补充): 可补充 LinkedIn / Google Scholar 等主页，以及简历 PDF 下载按钮
  contact: {
    email: "xiezy3@gmail.com",
    github: "https://github.com/SORMaker",
  },
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
      title: "TRON Camp 2026: Multi-Task VLA",
      href: "https://github.com/SORMaker/troncamp-mani",
      dates: "Jul 2026 - Aug 2026",
      description:
        "Team LimY at LimX Dynamics' TRON Camp, on the TRON2 dual-arm robot. **2nd in table clearing, 5th overall.** The team fine-tuned one π0.5 model with LoRA for flower insertion and table clearing, and used DAgger to collect correction demos for failed insertions. I collected VR teleoperation demos for table clearing and cloth folding and removed corrupted episodes. To qualify, I trained ACT policies for four simulated dual-arm tasks in the online stage. The video shows my three-bowl stacking policy in simulation.",
      technologies: ["π0.5", "LoRA", "DAgger", "Teleoperation", "ACT"],
      image: "/projects/act-t4-poster.webp",
      imageAlt: "Simulated TRON2 dual-arm robot stacking three bowls with an ACT policy",
      video: "/projects/act-t4.mp4",
    },
    {
      title: "Vision-and-Language Navigation",
      href: "https://github.com/SORMaker/VLN",
      dates: "Jan 2025 - Jun 2025",
      description:
        "Project lead. I raised the validation success rate by **11 points** by training a Seq2Seq agent (LSTM with attention) on R2R with student forcing instead of teacher forcing. I then reproduced [MapGPT](https://arxiv.org/abs/2401.07314) (ACL 2024), a GPT-4o agent that plans on a map of visited viewpoints, and built top-down trajectory views to study its failures. The work later grew into [MD-Grasp](/#publications) (PRCV 2025).",
      technologies: ["PyTorch", "LLM Agents", "Matterport3D", "Seq2Seq"],
      image: "/projects/vln-navigation-success.gif",
      imageAlt: "Top-down replay of a Seq2Seq agent's route next to the ground-truth route",
      imageFit: "contain",
    },
    {
      title: "Autonomous Off-road Bicycle",
      href: "https://github.com/SORMaker/CH32-Bike-Overland",
      dates: "Mar 2023 - Aug 2023",
      description:
        "A self-balancing bicycle that follows outdoor routes by itself, with all control on a RISC-V CH32V307 microcontroller. We were a team of three. I implemented the state estimation: GNSS and magnetometer drivers, ellipsoid-fitting magnetometer calibration, Mahony attitude estimation, and GPS–IMU fusion. I also designed the control loops: a three-loop cascade (speed, roll angle, roll rate) that balances the bike with the flywheel, and a cascaded steering loop with yaw-rate feedback that reduces servo jitter. The team used B-spline route planning and Stanley path tracking. **National First Prize**, 3rd place nationally.",
      technologies: ["CH32V307", "Cascade PID", "Stanley", "Sensor Fusion"],
      image: "/projects/bicycle.webp",
      imageAlt: "The autonomous off-road bicycle at the competition",
    },
    {
      title: "Laser Target Tracking System",
      href: "https://github.com/SORMaker/2023NUEDC",
      dates: "Aug 2023 - Sep 2023",
      description:
        "A two-gimbal laser system built in four days for the 2023 National Electronics Design Contest: one gimbal draws a path with a red laser, and the other tracks it with a green laser. With my smart-car teammates, I wrote real-time laser-spot detection for both gimbals (OpenMV and K210), and sent the spot coordinates to the CH32V307 controllers over UART as checksummed packets. **National First Prize** and Shanghai First Prize.",
      technologies: ["OpenMV", "K210", "Machine Vision", "Embedded Control"],
      image: "/projects/laser-tracking.webp",
      imageAlt: "The two pan-tilt laser gimbals with OpenMV and K210 cameras",
    },
  ] satisfies Project[],
  honors: [
    {
      title: "Shanghai Outstanding Graduate",
      dates: "June 2025",
      organization: "Shanghai Municipal Education Commission",
    },
    {
      title: "China National Scholarship",
      dates: "December 2024",
      organization: "Ministry of Education of the People's Republic of China",
    },
    {
      title: "Shanghai Government Scholarship",
      dates: "December 2023",
      organization: "Shanghai Municipal Education Commission",
    },
    {
      title: "China Undergraduate Mathematical Contest in Modeling",
      dates: "November 2023",
      organization: "Shanghai",
      description: "Shanghai Second Prize.",
      competition: true,
    },
    {
      title: "National University Students Intelligent Car Race",
      dates: "September 2023",
      organization: "Chinese Association of Automation",
      description: "National First Prize (3rd place) with the self-balancing off-road bicycle.",
      competition: true,
      source: "https://github.com/SORMaker/CH32-Bike-Overland",
    },
    {
      title: "National Undergraduate Electronics Design Contest",
      dates: "September 2023",
      organization: "Ministry of Education · Ministry of Industry and Information Technology",
      description: "National First Prize and Shanghai First Prize with the laser target tracking system.",
      competition: true,
      source: "https://github.com/SORMaker/2023NUEDC",
    },
    {
      title: "Shanghai Undergraduate Electronics Design Contest",
      dates: "November 2022",
      organization: "Shanghai",
      description: "Shanghai First Prize with a TC264-based vehicle control system.",
      competition: true,
      source: "https://github.com/SORMaker/2022TICup",
    },
    {
      title: "Excellent Student",
      dates: "2021 - 2024",
      organization: "Donghua University",
      description: "Three consecutive years.",
    },
  ] satisfies Honor[],
  publications: [
    {
      title:
        "Global Exponential Frequency Estimation for Discrete-time Multi-tone Sinusoidal Signals with an Unknown Bias",
      authors: "**Zhengyang Xie**, Tao Liu",
      venue: "Under revision",
      year: "",
    },
    {
      // TODO(补充): 论文 DOI / PDF 链接
      title:
        "MD-Grasp: Background-Adaptive Grasp Detection for Real-time Robotic Manipulation Using Mamba and Attention Fusion Network",
      authors: "Futeng Liu, Diankai Sun, **Zhengyang Xie**, Jiacui Huang, Hongtao Zhang, Mingbo Zhao",
      venue: "Proceedings of the 8th Chinese Conference on Pattern Recognition and Computer Vision (PRCV), pp. 62–76",
      year: "2025",
    },
  ],
};
