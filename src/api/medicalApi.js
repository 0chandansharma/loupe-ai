// src/api/medicalApi.js
import * as FileSystem from 'expo-file-system';

// Mock data for development/testing
const MOCK_REPORTS = [
  {
    English_Summary: "The mammography report indicates an abnormality in the left breast. A round, high-density mass with microlobulated margins is observed in the upper outer quadrant, measuring 5.5 x 5 cm. Few coarse and fine pleomorphic calcifications are noted within the mass. No microcalcifications are seen. The lymph nodes (axillary) appear normal. The findings are categorized as BIRADS 5, suggesting a high likelihood of malignancy. Biopsy and further evaluation and consultation with a specialist are recommended to confirm the diagnosis and decide on the next steps.",
    Hindi_Summary: "मेमोग्राफी रिपोर्ट में बाईं स्तन में असामान्यता पाई गई है। ऊपरी बाहरी हिस्से में 5.5 x 5 सेमी का गोल, उच्च घनत्व वाला मास पाया गया है, जिसमें सूक्ष्म लोबुलेटेड किनारे हैं। मास के भीतर कुछ मोटे और महीन प्लियोमॉर्फिक कैल्सिफिकेशन देखे गए हैं। कोई सूक्ष्म कैल्सिफिकेशन नहीं देखा गया। लसीका ग्रंथि (एक्सिलरी) सामान्य दिख रही हैं। यह निष्कर्ष BIRADS श्रेणी 5 में आता है, जो कैंसर की उच्च संभावना को दर्शाता है। निदान की पुष्टि और अगले कदम तय करने के लिए बायोप्सी और विशेषज्ञ से परामर्श की सिफारिश की जाती है।"
  },
  {
    English_Summary: "The blood test results show elevated white blood cell count (15,000/μL) suggesting an ongoing infection or inflammation. Hemoglobin is within normal range at 14.2 g/dL. Platelets slightly elevated at 450,000/μL. Fasting blood glucose is high at 146 mg/dL indicating possible pre-diabetes. Liver function tests show mildly elevated ALT (65 U/L) and AST (48 U/L). Renal function appears normal with creatinine at 0.9 mg/dL. Recommend follow-up glucose tolerance test and monitoring of liver enzymes. Patient should be evaluated for potential infectious process.",
    Hindi_Summary: "रक्त परीक्षण के परिणामों में श्वेत रक्त कोशिका की संख्या बढ़ी हुई (15,000/μL) दिखाई गई है, जो संक्रमण या सूजन का संकेत देती है। हीमोग्लोबिन 14.2 g/dL के साथ सामान्य सीमा में है। प्लेटलेट्स थोड़े बढ़े हुए हैं, 450,000/μL पर। उपवास रक्त ग्लूकोज 146 mg/dL पर उच्च है, जो संभावित प्री-डायबिटीज का संकेत देता है। लिवर फंक्शन टेस्ट में ALT (65 U/L) और AST (48 U/L) हल्के बढ़े हुए दिखाई देते हैं। क्रिएटिनिन 0.9 mg/dL के साथ गुर्दे का कार्य सामान्य लगता है। ग्लूकोज टॉलरेंस टेस्ट और लिवर एंजाइमों की निगरानी के लिए फॉलो-अप की सिफारिश की जाती है। रोगी का संभावित संक्रमण प्रक्रिया के लिए मूल्यांकन किया जाना चाहिए।"
  },
  {
    English_Summary: "The chest X-ray reveals clear lung fields bilaterally with no evidence of consolidation, infiltrates, or pleural effusion. Heart size appears normal with cardiothoracic ratio within normal limits. No mediastinal widening observed. Bony structures show no acute abnormalities. Diaphragm and costophrenic angles are intact. Overall impression is a normal chest X-ray with no radiographic evidence of acute cardiopulmonary disease.",
    Hindi_Summary: "छाती के एक्स-रे में दोनों ओर फेफड़े के क्षेत्र साफ दिखाई देते हैं, जिनमें कोई संघनन, इन्फिल्ट्रेट, या प्लूरल एफ्यूजन नहीं है। हृदय का आकार कार्डियोथोरैसिक अनुपात के साथ सामान्य सीमा के भीतर दिखाई देता है। कोई मध्यस्थ चौड़ा नहीं देखा गया। हड्डियों की संरचना में कोई तीव्र असामान्यताएं नहीं दिखती हैं। डायाफ्राम और कोस्टोफ्रेनिक कोण अक्षत हैं। समग्र निष्कर्ष एक सामान्य छाती का एक्स-रे है जिसमें तीव्र कार्डियोपल्मोनरी रोग का कोई रेडियोग्राफिक प्रमाण नहीं है।"
  }
];

// Function to get a random mock report
const getRandomMockReport = () => {
  const randomIndex = Math.floor(Math.random() * MOCK_REPORTS.length);
  return MOCK_REPORTS[randomIndex];
};

// Mock API function
export const processMedicalReport = async (imageUri) => {
  try {
    console.log('Processing image:', imageUri);
    
    // Simulate network delay (1-3 seconds)
    return new Promise((resolve) => {
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        resolve(getRandomMockReport());
      }, delay);
    });
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process medical report');
  }
};