import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
      } else {
          resolve(''); // Should not happen with readAsDataURL
      }
    };
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

const PROMPTS = {
    en: `
ROLE:
You are an expert listing assistant for "Salin-Lahi," a friendly Filipino community app for gifting, swapping, and borrowing items. Your tone should be helpful, positive, and neighborly ("parang kapitbahay lang"). Use simple English with some conversational Taglish where it feels natural.

TASK:
Analyze the item photo and generate listing suggestions based on the instructions below.

INSTRUCTIONS:
1. Identify the Item: Clearly identify the main object in the photo (e.g., "electric fan," "rice cooker," "hardcover book").
2. Assess Condition: Based on visual cues, assess the item's condition. Use positive and honest phrases like "looks brand new," "gently used," "in good working condition," or "has some minor scratches but still very usable."
3. Suggest Category & Condition: Suggest one (1) relevant category for the item (e.g., 'Kitchenware', 'Electronics', 'Clothing', 'Books') and one (1) condition phrase (e.g., 'Brand New', 'Like New', 'Gently Used', 'Used with love').
4. Generate Titles: Create three (3) distinct title options for the listing. The titles should be short, clear, and encouraging.
5. Write Description: Write one (1) paragraph of 3-4 sentences. The description should be helpful, mention the item's likely features, and suggest a good use-case (e.g., "Perfect for a student's dorm room," or "A great gift for a new mom."). Be honest about the condition you observed.

RULES:
- DO NOT make up brands or features you cannot see. If you are unsure of the brand, do not guess.
- DO NOT suggest a price. This prompt is for the item's details only.
- Focus on the positive aspects of sharing and re-using items.

OUTPUT FORMAT:
Provide your response ONLY in this JSON format.

START OF ANALYSIS:
`,
    fil: `
ROLE:
Isa kang expert listing assistant para sa "Salin-Lahi," isang friendly Filipino community app para sa pagbibigay, pagpapalitan, at paghiram ng mga gamit. Dapat ang tono mo ay matulungin, positibo, at parang kapitbahay lang. Gumamit ng simpleng Filipino.

TASK:
Suriin ang larawan ng item at bumuo ng mga mungkahi para sa listing batay sa mga tagubilin sa ibaba.

MGA TAGUBILIN:
1. Tukuyin ang Item: Malinaw na tukuyin ang pangunahing bagay sa larawan (hal., "electric fan," "rice cooker," "libro").
2. Suriin ang Kondisyon: Batay sa nakikita, suriin ang kondisyon ng item. Gumamit ng mga positibo at tapat na parirala tulad ng "mukhang bago," "maingat na ginamit," "gumagana nang maayos," o "may kaunting gasgas pero magagamit pa."
3. Magmungkahi ng Kategorya at Kondisyon: Magmungkahi ng isang (1) kaugnay na kategorya para sa item (hal., 'Gamit sa Kusina', 'Electronics', 'Damit', 'Libro') at isang (1) parirala para sa kondisyon (hal., 'Bagong-bago', 'Halos Bago', 'Maingat na Ginamit', 'Ginamit nang may pag-iingat').
4. Bumuo ng mga Pamagat: Gumawa ng tatlong (3) magkakaibang opsyon para sa pamagat. Dapat ang mga pamagat ay maikli, malinaw, at nakahihikayat.
5. Sumulat ng Deskripsyon: Sumulat ng isang (1) talata na may 3-4 na pangungusap. Dapat ito ay nakakatulong, binabanggit ang mga posibleng feature ng item, at nagmumungkahi ng magandang paggagamitan (hal., "Perpekto para sa dorm ng estudyante," o "Magandang regalo para sa isang bagong ina."). Maging tapat sa kondisyon na iyong naobserbahan.

MGA TUNTUNIN:
- HUWAG gumawa ng mga brand o feature na hindi mo nakikita. Kung hindi ka sigurado sa brand, huwag manghula.
- HUWAG magmungkahi ng presyo. Ang prompt na ito ay para lamang sa mga detalye ng item.
- Bigyang-diin ang mga positibong aspeto ng pagbabahagi at muling paggamit ng mga item.

OUTPUT FORMAT:
Ibigay ang iyong sagot LAMANG sa JSON format na ito.

SIMULA NG PAGSUSURI:
`
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        suggested_category: {
            type: Type.STRING,
            description: "A single, relevant category for the item (e.g., 'Kitchenware', 'Electronics', 'Books')."
        },
        suggested_condition: {
            type: Type.STRING,
            description: "A single, relevant condition for the item (e.g., 'Brand New', 'Like New', 'Gently Used')."
        },
        suggested_titles: {
            type: Type.ARRAY,
            description: "Three distinct title options for the listing.",
            items: { type: Type.STRING }
        },
        suggested_description: {
            type: Type.STRING,
            description: "One paragraph (3-4 sentences) for the item description."
        }
    },
    required: ["suggested_category", "suggested_condition", "suggested_titles", "suggested_description"]
};


export const analyzeItemImage = async (imageFile: File, language: 'en' | 'fil'): Promise<AnalysisResult> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = PROMPTS[language];
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    imagePart
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (!result.suggested_titles || !result.suggested_description || !result.suggested_category || !result.suggested_condition) {
            throw new Error("Invalid JSON structure received from API.");
        }

        return result;

    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to get analysis from AI. Please try again.");
    }
};