import api from './index';
import * as FileSystem from 'expo-file-system';

export const processMedicalReport = async (imageUri) => {
  try {
    // Create form data for image upload
    const formData = new FormData();
    
    // Get file name and type
    const imageName = imageUri.split('/').pop();
    const imageType = 'image/jpeg'; // Default to JPEG
    
    // Create file object
    const file = {
      uri: imageUri,
      name: imageName,
      type: imageType,
    };
    
    formData.append('report_image', file);
    
    // For demo purposes, simulate API response with a Promise
    // Replace this with actual API call in production
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            English_Summary: "The mammography report indicates an abnormality in the left breast. A round, high-density mass with microlobulated margins is observed in the upper outer quadrant, measuring 5.5 x 5 cm. Few coarse and fine pleomorphic calcifications are noted within the mass. No microcalcifications are seen. The lymph nodes (axillary) appear normal. The findings are categorized as BIRADS 5, suggesting a high likelihood of malignancy. Biopsy and further evaluation and consultation with a specialist are recommended to confirm the diagnosis and decide on the next steps.",
            Hindi_Summary: "मेमोग्राफी रिपोर्ट में बाईं स्तन में असामान्यता पाई गई है। ऊपरी बाहरी हिस्से में 5.5 x 5 सेमी का गोल, उच्च घनत्व वाला मास पाया गया है, जिसमें सूक्ष्म लोबुलेटेड किनारे हैं। मास के भीतर कुछ मोटे और महीन प्लियोमॉर्फिक कैल्सिफिकेशन देखे गए हैं। कोई सूक्ष्म कैल्सिफिकेशन नहीं देखा गया। लसीका ग्रंथि (एक्सिलरी) सामान्य दिख रही हैं। यह निष्कर्ष BIRADS श्रेणी 5 में आता है, जो कैंसर की उच्च संभावना को दर्शाता है। निदान की पुष्टि और अगले कदम तय करने के लिए बायोप्सी और विशेषज्ञ से परामर्श की सिफारिश की जाती है।"
          }
        });
      }, 2000);
    });
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to process medical report');
  }
};