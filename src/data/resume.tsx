import { Icons } from "@/components/icons";
import { BookOpenText, BrainCircuit, Combine, Cpu, HomeIcon, Terminal } from "lucide-react";
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
    "Master's student at SUSTech working on robot learning, from VLA policies for dual-arm manipulation to embedded control.",
  summary:
    "I'm a master's student in Control Science and Engineering at [SUSTech](/#education). I'm interested in how robots learn manipulation skills from demonstrations, and in what it takes to make those skills hold up on real hardware.\n\nMost recently, I trained ACT policies and helped train a multi-task VLA policy for the TRON2 dual-arm robot at [TRON Camp 2026](/#work), where our team placed 5th onsite and 2nd in table clearing. Before that, I explored LLM-based planning for vision-and-language navigation and co-authored [MD-Grasp](/#publications), a real-time grasp detection network (PRCV 2025).\n\nMy foundation is in control. At Donghua University, where I ranked in the top 2% of my major, I built a self-balancing autonomous bicycle and a vision-guided laser tracking system — both won [national first prizes](/#honors). I'm currently looking for **internships in embodied AI and VLA**.",
// TODO(补充): 头像目前是卡通狗，求职用可换成真人照片
  avatarUrl: "/avatar.webp",
  skills: [
    { name: "Python", icon: Python },
    { name: "C/C++", icon: Cplusplus },
    { name: "PyTorch", icon: PyTorch },
    { name: "ROS", icon: Ros },
    { name: "MATLAB", icon: Matlab },
    { name: "Git", icon: Git },
    { name: "Linux", icon: Terminal },
    { name: "Imitation Learning", icon: BrainCircuit },
    { name: "Embedded Control", icon: Cpu },
    { name: "Sensor Fusion", icon: Combine },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog/", icon: BookOpenText, label: "Blog" },
  ],
// TODO(补充): 可补充 LinkedIn / Google Scholar 等主页，以及简历 PDF 下载按钮
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
// TODO(补充): 线上选拔开始时间（目前只写了 Aug 2026）；线下 VLA 用的基础模型与微调方式
      company: "TRON Camp 2026 · Multi-Task VLA",
      href: "https://github.com/SORMaker/troncamp-mani",
      badges: [],
      location: "LimX Dynamics",
      title: "Team LimY · 5th overall (71.56), 2nd in table clearing",
      logoUrl: "/organizations/limx-dynamics.svg",
      start: "Aug 2026",
      end: "Aug 2026",
      description:
        "Qualified through the online simulation stage, then competed onsite with the TRON2 dual-arm robot.\n\n- **One policy, two tasks.** Contributed to 8-GPU [FluxVLA](https://github.com/emoPointer/FluxVLA-Tron2) training that combined flower arranging and language-conditioned sorting in a single policy; in competition-time robot trials, joint training outperformed separately trained policies.\n- **Demonstration data.** Planned and collected VR teleoperation demonstrations with the team on the three-camera TRON2 (500 sorting demos across 10 prompts, 600 folding demos), removed corrupted episodes, and flagged low-quality demonstrations.\n- **Targeted corrections.** To fix failed insertions at the vase opening, contributed to 50 DAgger-style correction demos on top of 300 flower-arranging demos, and evaluated intermediate checkpoints with full-task robot rollouts.\n- **Simulation qualifier.** Trained ACT policies for four simulated tasks — see [ACT for Dual-Arm Manipulation](/#projects).",
    },
    {
// TODO(补充): 导师姓名、起始时间（目前假定 Sep 2025）、投稿/预印本状态与链接
      company: "Frequency Estimation with an Unknown Bias",
      href: "https://www.sustech.edu.cn/en/",
      badges: [],
      location: "Shenzhen, China",
      title: "Research project · SUSTech",
      logoUrl: "/education/sustech.png",
      start: "Sep 2025",
      end: null,
      description:
        "Adaptive estimation of the unknown frequencies of discrete-time multi-tone sinusoids corrupted by an unknown constant bias.\n\n- Extended a two-filter adaptive estimator with a modified characteristic-polynomial parameterization.\n- Proved persistent excitation of the regressor, including the zero-bias case, and global exponential convergence of the estimation errors; after normalization, the gain conditions no longer depend on signal amplitudes or initial states.\n- Validated the design in comparative simulations covering bias handling, large initial states, and increased amplitudes.",
    },
    {
// TODO(补充): 「科创未来实验室」的官方英文名与链接（目前链接到东华官网）
      company: "Science & Innovation Lab",
      href: "https://english.dhu.edu.cn/",
      badges: [],
      location: "Shanghai, China",
      title: "Student Lead · Donghua University",
      logoUrl: "/education/donghua.png",
      start: "Sep 2023",
      end: "Jul 2024",
      description:
        "Led Donghua's student science-and-innovation lab.\n\n- Trained more than 50 new members.\n- Organized college- and university-level smart-car competitions and lab open days for 100+ students and visitors.\n- Managed the lab's budget, reimbursements, and equipment purchasing.",
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
      degree: "B.Eng. in Automation · GPA 4.21/5.00, top 2%",
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
        "Online qualifier for TRON Camp 2026. Trained Action Chunking with Transformers (ACT) policies for a simulated TRON2 dual-arm robot on four tasks of increasing difficulty, ending with three-bowl stacking — 1,021 demonstrations, 3-GPU DDP, score **64.3**. I also hardened the training loop for long runs: atomic best-checkpoint saving with resume, cosine LR scheduling, configurable validation intervals, and NaN/Inf guards.",
      technologies: ["ACT", "PyTorch", "DDP", "Dual-arm", "Simulation"],
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
        "Project lead. Built an LSTM-attention Seq2Seq baseline in Matterport3D and raised its validation success rate by **11 points** with student-forcing training. I then replaced the learned policy with an LLM planner, giving it the scene graph's node connectivity as text so it could reason over explicit topology — reaching **2.3×** the baseline success rate in unseen environments. The work later grew into [MD-Grasp](/#publications) (PRCV 2025).",
      technologies: ["PyTorch", "LLM Agents", "Matterport3D", "Seq2Seq"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/VLN",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/vln-navigation-success.gif",
      imageFit: "contain",
      imageAlt: "Successful Seq2Seq baseline navigation replay showing the agent route and ground-truth route in top and 3D views",
      mediaCaption: "Seq2Seq baseline · navigation replay",
      video: "",
    },
    {
      title: "Autonomous Off-road Bicycle",
      href: "https://github.com/SORMaker/CH32-Bike-Overland",
      dates: "Mar 2023 - Aug 2023",
      active: true,
      description:
        "A self-balancing bicycle that follows outdoor routes on its own, with all control running on a RISC-V CH32V307 microcontroller. I co-developed the control software: Mahony attitude estimation (less noisy than the IMU's on-chip fusion), GPS–IMU localization, Stanley path tracking, and cascaded PID balance control, plus angular-rate feedback that suppresses steering-servo jitter at high speed. **National First Prize**, 3rd place nationally.",
      technologies: ["CH32V307", "Cascade PID", "Stanley", "Sensor Fusion"],
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
// TODO(补充): 确认个人分工（K210 视觉 + 通信链路）与队友；可补实物照片或视频
      title: "Laser Target Tracking System",
      href: "https://github.com/SORMaker/2023NUEDC",
      dates: "Aug 2023 - Sep 2023",
      active: true,
      description:
        "Built in four days for the 2023 National Electronics Design Contest: a green laser automatically chases a moving red-laser target. I wrote the K210 vision pipeline that extracts the target's X/Y position in real time, and the communication link that streams it to the tracking controller. **National First Prize** and Shanghai First Prize.",
      technologies: ["K210", "Machine Vision", "Embedded Control"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SORMaker/2023NUEDC",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/laser-system-overview.gif",
      imageFit: "contain",
      imageAlt: "Animated system architecture and tracking-model illustration for the 2023 NUEDC laser tracking project",
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
// TODO(补充): 具体月份与所做题目
      title: "China Undergraduate Mathematical Contest in Modeling",
      dates: "2023",
      location: "Shanghai",
      description: "Shanghai Second Prize.",
      links: [],
    },
    {
// TODO(补充): 确认获奖作品是否为 TC264 小车控制系统
      title: "Shanghai Undergraduate Electronics Design Contest",
      dates: "November 2022",
      location: "Shanghai",
      description: "Shanghai First Prize with a TC264-based vehicle control system.",
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
      dates: "2021 - 2024",
      location: "Donghua University",
      description: "Three consecutive years.",
      links: [],
    },
  ],
  publications: [
    {
// TODO(补充): 论文 DOI / PDF 链接
      title:
        "MD-Grasp: Background-Adaptive Grasp Detection for Real-time Robotic Manipulation Using Mamba and Attention Fusion Network",
      authors:
        "Futeng Liu, Diankai Sun, **Zhengyang Xie**, Jiacui Huang, Hongtao Zhang, Mingbo Zhao",
      venue: "Pattern Recognition and Computer Vision (PRCV)",
      year: "2025",
    },
  ],
} as const;
