
import Contact from '../../../public/contact.jpg';
import SGLogo from '../../../public/log.jpeg';
import User from '../../../public/user.jpg';
import Construct from '../../../public/const.jpg';
import Call from '../../../public/call.jpg';
import Company from '../../../public/company.jpg';
import icon1 from '../../../public/icon1.png';
import icon2 from '../../../public/icon2.png';
import icon3 from '../../../public/icon3.png';

export const slides = [
    {
        url: Contact,
        description: "HVAC calculations ensure comfort and efficiency.",
    },
    {
        url: SGLogo,
        description: "Engineers design systems for optimal performance.",
    },
    {
        url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        description: "Factors considered: size, insulation, occupancy.",
    },
    {
        url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        description: "Analyze heat, airflow, equipment for efficiency.",
    },
    {
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        description: "Tailor solutions to specific environmental needs.",
    },
];

export const card = [
    {
        image: User,
        title: 'Expert Worker',
        description: 'Experienced professionals dedicated to delivering high-quality results efficiently, with a focus on precision, innovation, and client satisfaction'
    },
    {
        image: Construct,
        title: 'Quality Work',
        description: 'Commitment to excellence, ensuring top-notch craftsmanship, reliability, and attention to detail in every project undertaken.'
    },
    {
        image: Call,
        title: '24/7 Support',
        description: 'Round-the-clock assistance, responsive communication, immediate resolutions, ensuring uninterrupted support for all your needs'
    },
]

export const  experience = [
    {
        image: Company,
        title: 'Welcome to SG Design',
        subTitle: 'Company Experience',
        description: ' With a wealth of expertise in HVAC calculation, our company excels in crafting tailored heating, ventilation, and air conditioning solutions. Adhering to industry standards and regulations, we meticulously calculate heating and cooling loads, optimize duct sizing, and analyze airflow for superior system performance. Our proficiency spans diverse sectors, from residential to commercial and industrial projects, ensuring customized solutions to meet every need. Leveraging innovative technologies and methodologies, we deliver energy-efficient HVAC designs.'
    }
]

export const progress:any = [
    {
        title: "Architecture",
        completion: "80%",
    },
    {
        title: "Building",
        completion: "70%",
    },
    {
        title: "Construction",
        completion: "90%",
    },
]

export const cards = [
    {
        title: "Construction Management",
        desc: "This area delivers the control you want over all critical aspects of your project",
        icon: icon1,
    },
    {
        title: "Owner's Representation",
        desc: "A good owner's rep saves their client time, money and a lot of headaches.",
        icon: icon2,
    },
    {
        title: "General Contractor",
        desc: "Clients hire SG Design Group because we deliver great value, without question.",
        icon: icon3,
    },
]