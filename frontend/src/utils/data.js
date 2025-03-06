// navbar data

import akshanshTyagi from "../assets/akshanshTyagi.jpg"
import mohdArishLhan from "../assets/mohdArishKhan.jpg"
import asim from "../assets/asim.jpeg"
import rajSharma from "../assets/rajSharma.jpg"
import shonak from "../assets/shonak.jpg"

const menuItems = {
  platform: {
    title: 'Platform',
    sections: [
      {
        title: 'ESSENTIALS',
        items: [
          { name: 'Question Bank', desc: 'Access a repository of past quiz questions.' },
          { name: 'Cheat Sheet', desc: 'Quick reference guides for better performance.' },
          { name: 'Demo Guide', desc: 'Get started with a step-by-step tutorial.' },
          { name: 'Pattern Analysis', desc: 'Study question patterns for strategic advantage.' },

        ]
      },
      {
        title: 'HELP & SUPPORT',
        items: [
          { name: 'About Us', desc: 'Learn more about GreedHunter.' },
          { name: 'FAQ', desc: 'Find answers to common questions.' },
          { name: 'Privacy Policy', desc: 'Understand our data protection policies.' },
          { name: 'Contact Us', desc: 'Reach out for inquiries and support.' },
          { name: 'Support Us', desc: 'Contribute and help us grow.' },
        ]
      },
      // {
      //   title: 'EVENTS',
      //   items: [
      //     { name: 'Past Events', desc: 'Browse highlights from previous competitions.' },
      //     { name: 'Live Events', desc: 'Participate in ongoing quiz battles and challenges.' },
      //     { name: 'Upcoming Events', desc: 'Stay updated on future tournaments and contests.' },
      //   ]
      // },
    ]
  },
  games: {
    title: 'Games',
    items: [
      { name: 'Puzzle Hunt', desc: 'Solve puzzles and uncover hidden treasures' },
      { name: 'Treasure Quest', desc: 'Embark on an adventure for rare rewards' },
      { name: 'Brain Bender', desc: 'Engage in mind-twisting challenges' },
      { name: 'Memory Maze', desc: 'Test your memory and navigation skills' },
    ]


  },
  rewards: {
    title: 'Rewards & Community',
    items: [
      { name: 'Redeem Rewards', desc: 'Exchange your points for exciting prizes' },
      { name: 'Leaderboard', desc: 'Compete with others and climb the rankings' },
      { name: 'Achievements', desc: 'Unlock badges as you progress' },
      // { name: 'Profile', desc: 'Manage your account and settings' },
    ]
  }
};


// company logo data

const greedHuntFAQ = [
  // General
  {
    questionCategory: "General",
    question: "What is GreedHunt and how does it work?",
    answer: "GreedHunt is an online competitive platform where users participate in various skill-based events like quizzes, coding challenges, music, and gaming competitions."
  },
  {
    questionCategory: "General",
    question: "Is GreedHunt free to join?",
    answer: "Yes! Signing up is free, but some events may have entry fees depending on the rewards and level of competition."
  },
  {
    questionCategory: "General",
    question: "What kind of users can join GreedHunt?",
    answer: "Students, professionals, and hobbyists from all fields can join and compete in different categories."
  },
  {
    questionCategory: "General",
    question: "Do I need any special software to participate?",
    answer: "No, you only need a browser and a stable internet connection. Some events might require specific tools, which will be mentioned in the event details."
  },
  {
    questionCategory: "General",
    question: "Are there age restrictions for participating?",
    answer: "Most events are open to all, but some may have age restrictions. Check the event description for details."
  },

  // Registration
  {
    questionCategory: "Registration",
    question: "How do I create an account on GreedHunt?",
    answer: "Click on the 'Register' button, fill in your details, and verify your email to activate your account."
  },
  {
    questionCategory: "Registration",
    question: "Can I change my registered email later?",
    answer: "No, your email is used for verification and cannot be changed. However, you can update other profile details."
  },
  {
    questionCategory: "Registration",
    question: "What should I do if I don’t receive the verification email?",
    answer: "Check your spam folder. If you still don’t receive it, try resending the verification email from the login page."
  },
  {
    questionCategory: "Registration",
    question: "Can I register using a social media account?",
    answer: "Currently, we support email-based registration only, but social logins will be added soon."
  },
  {
    questionCategory: "Registration",
    question: "Is there a registration deadline for events?",
    answer: "Yes, each event has a specific deadline, which is displayed on the event page."
  },

  // Account
  {
    questionCategory: "Account",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page, enter your registered email, and follow the reset link sent to your email."
  },
  {
    questionCategory: "Account",
    question: "Can I delete my account?",
    answer: "Yes, you can request account deletion from the settings page. However, this action is irreversible."
  },
  {
    questionCategory: "Account",
    question: "How can I update my profile details?",
    answer: "Go to your profile page and click on the 'Edit Profile' button to update your information."
  },
  {
    questionCategory: "Account",
    question: "Is my personal data safe on GreedHunt?",
    answer: "Yes, we use encryption and secure authentication methods to protect user data."
  },
  {
    questionCategory: "Account",
    question: "Can I have multiple accounts?",
    answer: "No, each participant is allowed only one account to ensure fair play."
  },

  // Events
  {
    questionCategory: "Events",
    question: "How often are new events added?",
    answer: "New events are added every week, and some seasonal competitions occur annually."
  },
  {
    questionCategory: "Events",
    question: "Can I participate in multiple events at the same time?",
    answer: "Yes! As long as the event timings do not overlap, you can register for multiple events."
  },
  {
    questionCategory: "Events",
    question: "Are events held online or offline?",
    answer: "Most events are online, but some physical events are organized in specific locations."
  },
  {
    questionCategory: "Events",
    question: "How do I check my event schedule?",
    answer: "You can view your enrolled events under the 'My Events' section in your dashboard."
  },
  {
    questionCategory: "Events",
    question: "What happens if I miss an event?",
    answer: "If you miss an event, you won't be able to participate or claim any rewards."
  },

  // Rewards & Prizes
  {
    questionCategory: "Prizes",
    question: "How are winners decided?",
    answer: "Winners are selected based on the highest scores or performance metrics defined in each event."
  },
  {
    questionCategory: "Prizes",
    question: "How do I receive my prize after winning?",
    answer: "Cash prizes are sent via bank transfer or digital wallets, and other rewards are shipped to your registered address."
  },
  {
    questionCategory: "Prizes",
    question: "Can I transfer my prize to someone else?",
    answer: "No, prizes are non-transferable and must be claimed by the registered participant."
  },
  {
    questionCategory: "Prizes",
    question: "Do I have to pay taxes on my winnings?",
    answer: "Taxes on cash prizes depend on your country’s regulations. Please check with your local authorities."
  },
  {
    questionCategory: "Prizes",
    question: "What happens if I don’t claim my prize in time?",
    answer: "Unclaimed prizes will be forfeited after the claim deadline, which is usually 30 days."
  },

  // Technical Issues
  {
    questionCategory: "Technical Issues",
    question: "What should I do if I face connectivity issues during an event?",
    answer: "Try reconnecting to a stable internet connection. If the problem persists, contact support."
  },
  {
    questionCategory: "Technical Issues",
    question: "What browsers are supported for GreedHunt?",
    answer: "We recommend using Google Chrome, Mozilla Firefox, or Microsoft Edge for the best experience."
  },
  {
    questionCategory: "Technical Issues",
    question: "How do I report a bug or issue?",
    answer: "Go to the 'Report Issue' section in your dashboard or contact our support team."
  },
  {
    questionCategory: "Technical Issues",
    question: "Can I pause a quiz or game midway?",
    answer: "No, once started, you must complete the quiz or game within the given time."
  },
  {
    questionCategory: "Technical Issues",
    question: "Why is my event page not loading properly?",
    answer: "Clear your cache, update your browser, and ensure you have a strong internet connection."
  }
];




// features section data

// const features = [
//   {
//     icon: <FiLayout className="w-8 h-8" />,
//     title: "Design and build",
//     description: "Designers can take control of HTML, CSS, and JavaScript in a visual canvas — while marketers can work with pre-made, design-approved building blocks.",
//     link: "#design-build"
//   },
//   {
//     icon: <FiUploadCloud className="w-8 h-8" />,
//     title: "Publish and edit",
//     description: "Choose how you want to add, edit, and update content at scale with our CMS: visually in our platform or programmatically through our headless APIs.",
//     link: "#publish-edit"
//   },
//   {
//     icon: <FiBarChart className="w-8 h-8" />,
//     title: "Analyze and optimize",
//     description: "Transform your site into your most valuable marketing asset with native tools for AI-powered personalization, A/B testing, SEO, localization, and more.",
//     link: "#analyze-optimize"
//   },
//   {
//     icon: <FiServer className="w-8 h-8" />,
//     title: "Scale and collaborate",
//     description: "15,000 websites are published every hour. Confidently scale your site with tools for hosting, security, compliance, and publishing — plus connect to your tech stack with integrations and APIs.",
//     link: "#scale-collaborate"
//   }
// ];

// design section data
const tabsData = [
  {
    id: 'tab1',
    title: 'Design without limits',
    subtitle: 'CodeTutor puts the power of code into a visual canvas so every team can create stunning websites quickly — and extend the power of their work with custom code.',
    video: 'https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/design.mp4',
    poster: 'https://cdn.prod.website-files.com/66e88746834b80507cdf7933/670570322cf4b274d716fed4_design-without-limits.avif',
    cta: {
      text: 'Discover Designer',
      link: '/designer'
    }
  },
  {
    id: 'tab2',
    title: 'Create complex, rich interactions',
    subtitle: 'Design scroll-based and multi-step interactions and animations and easily work with GSAP, Spline, 3D, Lottie, and Rive — all without even thinking about code.',
    video: 'https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/complex-rich-animations.mp4',
    poster: 'https://cdn.prod.website-files.com/66e88746834b80507cdf7933/67057032ad30932a68cd9d18_animations.avif',
    cta: {
      text: 'Discover Interactions',
      link: '/interactions-animations'
    }
  },
  {
    id: 'tab3',
    title: 'Empower everyone to build on-brand sites',
    subtitle: 'Give less technical teams the tools they need to build confidently with reusable design systems powered by variables, components, and libraries.',
    video: 'https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/build-on-brand-sites.mp4',
    poster: 'https://cdn.prod.website-files.com/66e88746834b80507cdf7933/67058d52036e5522e27966de_build-on-brand.avif',
    cta: {
      text: 'Discover page building',
      link: '/page-building'
    }
  },
  {
    id: 'tab4',
    title: 'Create even faster with the CodeTutor AI Assistant',
    subtitle: "CodeTutor's AI Assistant lets you build faster and more efficiently by applying your site's existing design system to new page sections.",
    video: 'https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/webflow-ai-assistant.mp4',
    poster: 'https://cdn.prod.website-files.com/66e88746834b80507cdf7933/670570323f08ce0aed3368e4_ai-assistant.avif',
    cta: {
      text: 'Discover AI Assistant',
      link: '/ai'
    }
  }
];

// customer section data

const testimonials = [
  {
    id: 1,
    name: "Shonak Alia",
    profession: "Student",
    image: shonak,
    content:
      "GreedHunter has transformed my learning experience. The quizzes are challenging yet rewarding, and I've discovered so much knowledge I never knew I needed!",
    stars: 5,
  },
  {
    id: 2,
    name: "Akshansh Tyagi",
    profession: "Student",
    image: akshanshTyagi,
    content:
      "The game challenges are addictive! I find myself spending hours solving mysteries and competing with friends. It's educational entertainment at its finest.",
    stars: 5,
  },
  {
    id: 3,
    name: "Asim Bin Quamar",
    profession: "Student",
    image: asim,
    content:
      "As an educator, I appreciate how GreedHunter makes learning fun and engaging. My students are hooked on the challenges and actually enjoying the learning process.",
    stars: 4,
  },
  {
    id: 4,
    name: "Mohd. Arish Khan",
    profession: "Student",
    image: mohdArishLhan,
    content:
      "The mystery challenges are mind-bending in the best way possible. I've improved my problem-solving skills tremendously since joining GreedHunter.",
    stars: 5,
  },
  {
    id: 5,
    name: "Raj Sharma",
    profession: "Student",
    image: rajSharma,
    content:
      "GreedHunter offers intellectual stimulation like no other platform. The quizzes are well-researched and the community is incredibly supportive.",
    stars: 4,
  },
  // {
  //   id: 6,
  //   name: "User6Name",
  //   profession: "Writer",
  //   image: "/api/placeholder/80/80",
  //   content:
  //     "The creative challenges on GreedHunter have helped me think outside the box and improved my writing skills. Absolutely worth every minute spent!",
  //   stars: 5,
  // },
  // {
  //   id: 7,
  //   name: "User7Name",
  //   profession: "Doctor",
  //   image: "/api/placeholder/80/80",
  //   content:
  //     "Even with my busy schedule, I find time for GreedHunter. It's a fantastic mental break that still keeps my brain active and learning.",
  //   stars: 5,
  // },
  // {
  //   id: 8,
  //   name: "User8Name",
  //   profession: "Artist",
  //   image: "/api/placeholder/80/80",
  //   content:
  //     "The visual challenges and puzzles are brilliantly designed. As someone who thinks in images, GreedHunter offers the perfect balance of education and creativity.",
  //   stars: 4,
  // },
  // {
  //   id: 9,
  //   name: "User9Name",
  //   profession: "Entrepreneur",
  //   image: "/api/placeholder/80/80",
  //   content:
  //     "GreedHunter has become my daily mental workout. The competitive aspect drives me to improve, and I've applied many learnings to my business.",
  //   stars: 5,
  // },
  // {
  //   id: 10,
  //   name: "User10Name",
  //   profession: "Retiree",
  //   image: "/api/placeholder/80/80",
  //   content:
  //     "Who says you can't teach an old dog new tricks? At 67, GreedHunter keeps my mind sharp and gives me something exciting to look forward to every day.",
  //   stars: 5,
  // },
];


//   about section data

const aboutFeatures = [
  {
    id: "ai-1",
    title: "Generate styled content quickly",
    description:
      "Whether you're trying to build even faster or you're just new to codeTutor, you can use AI Assistant to generate new page sections using your site's existing design system.",
    link: "https://help.webflow.com/hc/en-us/articles/34205154436243",
    linkText: "Explore documentation",
    video:
      "https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/design-assistant-ai.mp4",
    poster:
      "https://cdn.prod.website-files.com/66e88746834b80507cdf7933/6705703132e8c6c85119c96d_design-assistant.avif",
  },
  {
    id: "ai-2",
    title: "Generate text right within codetutor",
    description:
      "Quickly and easily create new content, natively within CodeTutor. From generating first-pass content to publishing at speed, the AI Assistant can help you develop variations with just a few clicks.",
    link: "https://help.webflow.com/hc/articles/34295931022099",
    linkText: "Explore documentation",
    video:
      "https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/writing-assistant-square.mp4",
    poster:
      "https://cdn.prod.website-files.com/66e88746834b80507cdf7933/67057031236cd506cd0ae632_writing-assistant.avif",
  },
  {
    id: "ai-3",
    title: "Generate text right within CodeTutor",
    description:
      "Quickly and easily create new content, natively within codetutor. From generating first-pass content to publishing at speed, the AI Assistant can help you develop variations with just a few clicks.",
    link: "https://help.webflow.com/hc/articles/34295931022099",
    linkText: "Explore documentation",
    video:
      "https://dhygzobemt712.cloudfront.net/Web/home/2024-wxp/features/writing-assistant-square.mp4",
    poster:
      "https://cdn.prod.website-files.com/66e88746834b80507cdf7933/67057031236cd506cd0ae632_writing-assistant.avif",
  },
];


//   footer section data

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Design', href: '/design' },
      { name: 'Interactions', href: '/interactions' },
      { name: 'Page Building', href: '/page-building' },
      { name: 'AI Assistant', href: '/ai' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Community', href: '/community' },
      { name: 'Support', href: '/support' },
      { name: 'API', href: '/api' }
    ]
  }
};

// const socialLinks = [
//   { icon: <FaFacebook />, href: 'https://facebook.com' },
//   { icon: <FaTwitter />, href: 'https://twitter.com' },
//   { icon: <FaInstagram />, href: 'https://instagram.com' },
//   { icon: <FaLinkedin />, href: 'https://linkedin.com' },
//   { icon: <FaYoutube />, href: 'https://youtube.com' }
// ];


export {
  menuItems, greedHuntFAQ, tabsData, testimonials, aboutFeatures, footerLinks
}