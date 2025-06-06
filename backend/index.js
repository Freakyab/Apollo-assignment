const express = require("express");
const cors = require("cors");
const bodyPareser = require("body-parser");
const app = express();
const Doctor = require("./model/doctor.model");

const PORT = process.env.PORT | 8000;

app.use(bodyPareser.json());
app.use(cors());
app.use(express.json());

app.get("/add-doctor-data", async (_, res) => {
  let data = [
    {
      name: "Dr. Priya Sharma",
      year: 12,
      post: "MD - General Medicine",
      location: "Mumbai, Maharashtra",
      fee: 800,
      rating: 4.8,
      count: 150,
      language: ["English", "Hindi", "Marathi"],
    },
    {
      name: "Dr. Rohan Gupta",
      year: 5,
      post: "BDS",
      location: "Delhi",
      fee: 500,
      rating: 4.5,
      count: 95,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. S. Krishnan",
      year: 20,
      post: "DM - Cardiology",
      location: "Chennai, Tamil Nadu",
      fee: 1200,
      rating: 4.9,
      count: 210,
      language: ["English"],
    },
    {
      name: "Dr. Aisha Khan",
      year: 8,
      post: "MS - Obstetrics and Gynecology",
      location: "Kolkata, West Bengal",
      fee: 950,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Vikram Singh",
      year: 15,
      post: "MBBS, DNB - Orthopedics",
      location: "Bengaluru, Karnataka",
      fee: 1100,
      rating: 4.7,
      count: 180,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Meera Patel",
      year: 7,
      post: "MD - Dermatology",
      location: "Ahmedabad, Gujarat",
      fee: 750,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Joseph Thomas",
      year: 11,
      post: "MS - General Surgery",
      location: "Hyderabad, Telangana",
      fee: 1000,
      rating: 4.6,
      count: 120,
      language: ["English"],
    },
    {
      name: "Dr. Kavita Verma",
      year: 4,
      post: "BAMS",
      location: "Pune, Maharashtra",
      fee: 400,
      rating: 4.3,
      count: 70,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Rakesh Yadav",
      year: 18,
      post: "MD - Pediatrics",
      location: "Lucknow, Uttar Pradesh",
      fee: 850,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Lakshmi Nair",
      year: 9,
      post: "MDS - Periodontics",
      location: "Kochi, Kerala",
      fee: 600,
      rating: 4.4,
      count: 105,
      language: ["English"],
    },
    {
      name: "Dr. Amit Sharma",
      year: 6,
      post: "BHMS",
      location: "Jaipur, Rajasthan",
      fee: 450,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Sunita Devi",
      year: 13,
      post: "MD - Psychiatry",
      location: "Nagpur, Maharashtra",
      fee: 900,
      rating: 4.7,
      count: 165,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Karthik Reddy",
      year: 10,
      post: "DNB - Neurology",
      location: "Coimbatore, Tamil Nadu",
      fee: 1150,
      language: ["English"],
    },
    {
      name: "Dr. Shabnam Hussain",
      year: 3,
      post: "B.Pharma",
      location: "Srinagar, Jammu & Kashmir",
      fee: 350,
      rating: 4.2,
      count: 55,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Gopalakrishnan",
      year: 17,
      post: "MS - ENT",
      location: "Madurai, Tamil Nadu",
      fee: 1050,
      language: ["English"],
    },
    {
      name: "Dr. Anjali Singh",
      year: 7,
      post: "MD - Radiology",
      location: "Chandigarh",
      fee: 700,
      rating: 4.5,
      count: 110,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. David Wilson",
      year: 14,
      post: "MBBS, MRCP",
      location: "Visakhapatnam, Andhra Pradesh",
      fee: 950,
      language: ["English"],
    },
    {
      name: "Dr. Neha Verma",
      year: 5,
      post: "BPT",
      location: "Indore, Madhya Pradesh",
      fee: 400,
      rating: 4.3,
      count: 80,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Suresh Kumar",
      year: 19,
      post: "DM - Nephrology",
      location: "Varanasi, Uttar Pradesh",
      fee: 1250,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Fatima Khan",
      year: 8,
      post: "MDS - Orthodontics",
      location: "Bhopal, Madhya Pradesh",
      fee: 650,
      rating: 4.6,
      count: 130,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Rajeshwari Pillai",
      year: 11,
      post: "MD - Anesthesiology",
      location: "Thiruvananthapuram, Kerala",
      fee: 800,
      language: ["English"],
    },
    {
      name: "Dr. Arvind Patel",
      year: 6,
      post: "BHMS",
      location: "Surat, Gujarat",
      fee: 480,
      rating: 4.4,
      count: 90,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Jyoti Mehra",
      year: 16,
      post: "MS - Ophthalmology",
      location: "Kanpur, Uttar Pradesh",
      fee: 1000,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Samuel Roy",
      year: 9,
      post: "DNB - Gastroenterology",
      location: "Guwahati, Assam",
      fee: 750,
      rating: 4.7,
      count: 140,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Shweta Nair",
      year: 4,
      post: "BDS",
      location: "Mangaluru, Karnataka",
      fee: 520,
      language: ["English"],
    },
    {
      name: "Dr. Imran Ali",
      year: 12,
      post: "MD - General Medicine",
      location: "Patna, Bihar",
      fee: 880,
      rating: 4.5,
      count: 115,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Deepika Sharma",
      year: 7,
      post: "MS - Obstetrics and Gynecology",
      location: "Vadodara, Gujarat",
      fee: 920,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Naveen Kumar",
      year: 10,
      post: "MBBS, DNB - Cardiology",
      location: "Nashik, Maharashtra",
      fee: 1080,
      rating: 4.8,
      count: 170,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Ananya Reddy",
      year: 5,
      post: "BAMS",
      location: "Vijayawada, Andhra Pradesh",
      fee: 420,
      language: ["English"],
    },
    {
      name: "Dr. Harpreet Singh",
      year: 18,
      post: "MD - Pediatrics",
      location: "Amritsar, Punjab",
      fee: 820,
      rating: 4.6,
      count: 190,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Keerthi Verma",
      year: 8,
      post: "MDS - Periodontics",
      location: "Raipur, Chhattisgarh",
      fee: 680,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Ashok Kumar",
      year: 13,
      post: "MD - Psychiatry",
      location: "Ranchi, Jharkhand",
      fee: 980,
      rating: 4.7,
      count: 155,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Sunaina Patel",
      year: 6,
      post: "BHMS",
      location: "Rajkot, Gujarat",
      fee: 460,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Rohan Sharma",
      year: 11,
      post: "MS - General Surgery",
      location: "Agra, Uttar Pradesh",
      fee: 1020,
      rating: 4.5,
      count: 125,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Priya Verma",
      year: 4,
      post: "BPT",
      location: "Meerut, Uttar Pradesh",
      fee: 380,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Karthik Nair",
      year: 17,
      post: "DM - Neurology",
      location: "Kozhikode, Kerala",
      fee: 1180,
      rating: 4.9,
      count: 200,
      language: ["English"],
    },
    {
      name: "Dr. Aisha Siddiqui",
      year: 9,
      post: "MDS - Orthodontics",
      location: "Allahabad, Uttar Pradesh",
      fee: 620,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Vikram Patel",
      year: 15,
      post: "MBBS, DNB - Orthopedics",
      location: "Jabalpur, Madhya Pradesh",
      fee: 1120,
      rating: 4.7,
      count: 175,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Meera Singh",
      year: 7,
      post: "MD - Dermatology",
      location: "Bhubaneswar, Odisha",
      fee: 780,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Joseph Khan",
      year: 10,
      post: "MS - ENT",
      location: "Mysuru, Karnataka",
      fee: 980,
      rating: 4.6,
      count: 135,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Kavita Reddy",
      year: 3,
      post: "B.Pharma",
      location: "Jodhpur, Rajasthan",
      fee: 360,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Rakesh Nair",
      year: 19,
      post: "DM - Cardiology",
      location: "Nagpur, Maharashtra",
      fee: 1220,
      rating: 4.8,
      count: 215,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Lakshmi Sharma",
      year: 8,
      post: "MD - Radiology",
      location: "Solapur, Maharashtra",
      fee: 720,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Amit Verma",
      year: 12,
      post: "MD - General Medicine",
      location: "Ghaziabad, Uttar Pradesh",
      fee: 860,
      rating: 4.5,
      count: 110,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Sunita Singh",
      year: 5,
      post: "BDS",
      location: "Aurangabad, Maharashtra",
      fee: 540,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Karthik Hussain",
      year: 16,
      post: "MS - Ophthalmology",
      location: "Kolhapur, Maharashtra",
      fee: 1040,
      rating: 4.9,
      count: 205,
      language: ["Marathi", "Hindi", "English"],
    },
    {
      name: "Dr. Shabnam Reddy",
      year: 9,
      post: "DNB - Gastroenterology",
      location: "Guntur, Andhra Pradesh",
      fee: 780,
      language: ["English"],
    },
    {
      name: "Dr. Gopalakrishnan Nair",
      year: 4,
      post: "BAMS",
      location: "Salem, Tamil Nadu",
      fee: 440,
      language: ["English"],
    },
    {
      name: "Dr. Anjali Khan",
      year: 14,
      post: "MBBS, MRCP",
      location: "Tiruchirappalli, Tamil Nadu",
      fee: 960,
      language: ["English"],
    },
    {
      name: "Dr. Pooja Sharma",
      year: 6,
      post: "BDS",
      location: "Ambala, Haryana",
      fee: 510,
      rating: 4.2,
      count: 85,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Rahul Verma",
      year: 13,
      post: "MD - General Medicine",
      location: "Dehradun, Uttarakhand",
      fee: 890,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Sridevi Krishnan",
      year: 7,
      post: "MS - Obstetrics and Gynecology",
      location: "Puducherry",
      fee: 930,
      rating: 4.6,
      count: 120,
      language: ["English"],
    },
    {
      name: "Dr. Amanpreet Singh",
      year: 11,
      post: "MBBS, DNB - Orthopedics",
      location: "Ludhiana, Punjab",
      fee: 1090,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Nikita Patel",
      year: 4,
      post: "BAMS",
      location: "Gandhinagar, Gujarat",
      fee: 410,
      rating: 4.4,
      count: 70,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. George Mathew",
      year: 18,
      post: "DM - Cardiology",
      location: "Kottayam, Kerala",
      fee: 1230,
      language: ["English"],
    },
    {
      name: "Dr. Sana Khan",
      year: 9,
      post: "MDS - Periodontics",
      location: "Bareilly, Uttar Pradesh",
      fee: 630,
      rating: 4.5,
      count: 100,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Vivek Sharma",
      year: 5,
      post: "BHMS",
      location: "Bhavnagar, Gujarat",
      fee: 470,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Anjana Devi",
      year: 15,
      post: "MD - Pediatrics",
      location: "Gorakhpur, Uttar Pradesh",
      fee: 830,
      rating: 4.7,
      count: 160,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Ravi Kumar",
      year: 8,
      post: "MS - General Surgery",
      location: "Durgapur, West Bengal",
      fee: 970,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Sushma Reddy",
      year: 12,
      post: "MD - Psychiatry",
      location: "Nellore, Andhra Pradesh",
      fee: 910,
      rating: 4.8,
      count: 145,
      language: ["English"],
    },
    {
      name: "Dr. Imran Khan",
      year: 6,
      post: "BPT",
      location: "Saharanpur, Uttar Pradesh",
      fee: 390,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Nandini Verma",
      year: 19,
      post: "DM - Nephrology",
      location: "Thanjavur, Tamil Nadu",
      fee: 1270,
      rating: 4.9,
      count: 220,
      language: ["English"],
    },
    {
      name: "Dr. John David",
      year: 7,
      post: "MDS - Orthodontics",
      location: "Palakkad, Kerala",
      fee: 670,
      language: ["English"],
    },
    {
      name: "Dr. Priya Singh",
      year: 10,
      post: "MD - Radiology",
      location: "Udaipur, Rajasthan",
      fee: 740,
      rating: 4.6,
      count: 125,
      language: ["Hindi", "English"],
    },

    {
      name: "Dr. Rajeshwari Gupta",
      year: 3,
      post: "B.Pharma",
      location: "Karnal, Haryana",
      fee: 370,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Arvind Kumar",
      year: 17,
      post: "MS - ENT",
      location: "Salem, Tamil Nadu",
      fee: 1070,
      rating: 4.6,
      count: 185,
      language: ["English"],
    },
    {
      name: "Dr. Jyoti Sharma",
      year: 8,
      post: "MD - Dermatology",
      location: "Jamnagar, Gujarat",
      fee: 770,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Samuel Singh",
      year: 11,
      post: "DNB - Neurology",
      location: "Warangal, Telangana",
      fee: 1170,
      rating: 4.7,
      count: 150,
      language: ["English"],
    },
    {
      name: "Dr. Shweta Gupta",
      year: 4,
      post: "BDS",
      location: "Mathura, Uttar Pradesh",
      fee: 530,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Imran Verma",
      year: 14,
      post: "MBBS, MRCP",
      location: "Kolhapur, Maharashtra",
      fee: 990,
      rating: 4.5,
      count: 115,
      language: ["Marathi", "English"],
    },
    {
      name: "Dr. Deepika Reddy",
      year: 9,
      post: "MDS - Periodontics",
      location: "Tirupati, Andhra Pradesh",
      fee: 610,
      language: ["English"],
    },
    {
      name: "Dr. Naveen Sharma",
      year: 6,
      post: "BHMS",
      location: "Rohtak, Haryana",
      fee: 490,
      rating: 4.4,
      count: 95,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Ananya Singh",
      year: 16,
      post: "MS - Ophthalmology",
      location: "Siliguri, West Bengal",
      fee: 1010,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Harpreet Verma",
      year: 7,
      post: "MD - General Medicine",
      location: "Jhansi, Uttar Pradesh",
      fee: 870,
      rating: 4.8,
      count: 130,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Keerthi Reddy",
      year: 10,
      post: "MS - Obstetrics and Gynecology",
      location: "Kakinada, Andhra Pradesh",
      fee: 940,
      language: ["English"],
    },
    {
      name: "Dr. Ashok Sharma",
      year: 3,
      post: "B.Pharma",
      location: "Panipat, Haryana",
      fee: 350,
      rating: 4.2,
      count: 65,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Sunaina Singh",
      year: 17,
      post: "DM - Cardiology",
      location: "Sagar, Madhya Pradesh",
      fee: 1210,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Rohan Reddy",
      year: 8,
      post: "MDS - Orthodontics",
      location: "Dhanbad, Jharkhand",
      fee: 690,
      rating: 4.6,
      count: 125,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Priya Khan",
      year: 12,
      post: "MD - Pediatrics",
      location: "Bhagalpur, Bihar",
      fee: 810,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Karthik Verma",
      year: 5,
      post: "BPT",
      location: "Muzaffarpur, Bihar",
      fee: 430,
      rating: 4.3,
      count: 75,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Aisha Sharma",
      year: 19,
      post: "DM - Nephrology",
      location: "Shimla, Himachal Pradesh",
      fee: 1290,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Vikram Reddy",
      year: 6,
      post: "BDS",
      location: "Ujjain, Madhya Pradesh",
      fee: 550,
      rating: 4.4,
      count: 90,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Meera Khan",
      year: 13,
      post: "MD - Psychiatry",
      location: "Bhilai, Chhattisgarh",
      fee: 930,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Joseph Verma",
      year: 7,
      post: "MS - General Surgery",
      location: "Bokaro, Jharkhand",
      fee: 1030,
      rating: 4.7,
      count: 155,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Kavita Sharma",
      year: 11,
      post: "DNB - Neurology",
      location: "Cuttack, Odisha",
      fee: 1130,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Rakesh Reddy",
      year: 4,
      post: "BAMS",
      location: "Rourkela, Odisha",
      fee: 390,
      rating: 4.2,
      count: 60,
      language: ["Hindi", "English"],
    },
    {
      name: "Dr. Lakshmi Khan",
      year: 18,
      post: "MS - ENT",
      location: "Malappuram, Kerala",
      fee: 1090,
      language: ["English"],
    },
    {
      name: "Dr. Amit Verma",
      year: 9,
      post: "MDS - Periodontics",
      location: "Kollam, Kerala",
      fee: 650,
      rating: 4.5,
      count: 105,
      language: ["English"],
    },
    {
      name: "Dr. Sunita Sharma",
      year: 5,
      post: "BHMS",
      location: "Thrissur, Kerala",
      fee: 450,
      language: ["English"],
    },
    {
      name: "Dr. Karthik Singh",
      year: 15,
      post: "MD - Radiology",
      location: "Hubli-Dharwad, Karnataka",
      fee: 750,
      rating: 4.8,
      count: 140,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Shabnam Verma",
      year: 8,
      post: "MD - Dermatology",
      location: "Belagavi, Karnataka",
      fee: 790,
      language: ["English", "Hindi"],
    },
    {
      name: "Dr. Gopalakrishnan Reddy",
      year: 12,
      post: "MD - General Medicine",
      location: "Mangalore, Karnataka",
      fee: 850,
      rating: 4.6,
      count: 115,
      language: ["English"],
    },
    {
      name: "Dr. Anjali Khan",
      year: 6,
      post: "BPT",
      location: "Davangere, Karnataka",
      fee: 410,
      language: ["English"],
    },
    {
      name: "Dr. David Sharma",
      year: 19,
      post: "DM - Cardiology",
      location: "Tumkur, Karnataka",
      fee: 1250,
      rating: 4.9,
      count: 225,
      language: ["English"],
    },
    {
      name: "Dr. Neha Reddy",
      year: 7,
      post: "MDS - Orthodontics",
      location: "Shivmogga, Karnataka",
      fee: 630,
      language: ["English"],
    },
    {
      name: "Dr. Suresh Khan",
      year: 10,
      post: "MBBS, DNB - Orthopedics",
      location: "Bidar, Karnataka",
      fee: 1050,
      rating: 4.7,
      count: 165,
      language: ["English"],
    },
    {
      name: "Dr. Fatima Verma",
      year: 3,
      post: "B.Pharma",
      location: "Kalaburagi, Karnataka",
      fee: 370,
      language: ["English"],
    },
    {
      name: "Dr. Rajeshwari Sharma",
      year: 17,
      post: "MS - Ophthalmology",
      location: "Ballari, Karnataka",
      fee: 990,
      rating: 4.5,
      count: 180,
      language: ["English"],
    },
    {
      name: "Dr. Arvind Reddy",
      year: 8,
      post: "MD - Pediatrics",
      location: "Hosur, Tamil Nadu",
      fee: 830,
      language: ["English"],
    },
  ];

  await Doctor.insertMany(data, { ordered: false })
    .then((result) => {
      console.log("Data inserted successfully", result);
    })
    .catch((error) => {
      console.error("Error inserting data", error.message);
    });
  res.json({ length: data.length });
});

app.get("/", async (_, res) => {
  try {
    const doctors = await Doctor.find({});

    if (!doctors) {
      return res
        .status(404)
        .json({ message: "No doctors found", status: false });
    }

    return res.status(200).json({
      status: true,
      data: doctors,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
});

app.post("/list-doctor-with-filter" , async (req, res) => {
  try{

    const { startRange, endRange, startFee, endFee, language, rating, location, search } = req.body;
    
    const query = {};

    if (startRange !== -1 && endRange !== -1) {
      query.year = { $gte: startRange, $lte: endRange };
    }
    if (startFee !== -1 && endFee !== -1) {
      query.fee = { $gte: startFee, $lte: endFee };
    }
    if (language) {
      query.language = { $regex: language, $options: "i" };
    }
    if (rating) {
      query.rating = { $gte: rating };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const doctors = await Doctor.find(query);
    return res.status(200).json({
      status: true,
      data: doctors,
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }

})

app.post("/add-doctor", async (req, res) => {
  try {
    const { name, year, post, location, fee, language } = req.body;
    
    if (!name || !year || !post || !location || !fee || !language) {
      return res.status(400).json({
        message: "Please provide all the required fields",
        status: false,
      });
    }
    
    const doctor = new Doctor({
      name,
      year,
      post,
      location,
      fee,
      language,
    });
    await doctor.save();
    return res.status(201).json({
      status: true,
      message: "Doctor added successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on the port ${PORT}`);
});
