import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PlanInputs, GeneratedLayout } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Name of the layout variant (e.g., Balanced Family Home)" },
      description: { type: Type.STRING, description: "Short description of the layout flow and vibe" },
      totalArea: { type: Type.STRING, description: "Total covered area string" },
      estimatedCost: { type: Type.STRING, description: "Estimated construction cost range in PKR or USD" },
      features: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Key features list (e.g. Large Windows, Open Kitchen)"
      },
      colorTheme: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the color palette" },
          primary: { type: Type.STRING, description: "Primary hex code (e.g. wall color)" },
          accent: { type: Type.STRING, description: "Accent hex code (e.g. decor/features)" },
          secondary: { type: Type.STRING, description: "Secondary hex code (e.g. flooring/furniture)" },
          description: { type: Type.STRING, description: "Why this theme fits the style" }
        },
        required: ["name", "primary", "accent", "secondary", "description"]
      },
      rooms: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Room name (e.g., Master Bed)" },
            size: { type: Type.STRING, description: "Dimensions (e.g., 14x16)" },
            description: { type: Type.STRING, description: "Detailed visual description for 3D generation (e.g., 'Modern bedroom with large window, beige walls, wooden floor, king size bed')" }
          },
          required: ["name", "size", "description"]
        }
      }
    },
    required: ["name", "description", "totalArea", "estimatedCost", "features", "rooms", "colorTheme"]
  }
};

export const generateFloorPlans = async (inputs: PlanInputs): Promise<GeneratedLayout[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    Act as a professional senior architect for 'Ahmed House Maker'.
    Design 3 distinct floor plan concepts based on the following client requirements:
    
    Plot Size: ${inputs.plotArea} ${inputs.unit}
    Floors: ${inputs.floors}
    Bedrooms: ${inputs.bedrooms}
    Bathrooms: ${inputs.bathrooms}
    Style: ${inputs.style}
    Primary Priority: ${inputs.priority}
    Budget Level: ${inputs.budget}

    Please provide 3 variations:
    1. A "Compact/Efficient" layout that maximizes utility.
    2. A "Balanced" layout that is standard and comfortable.
    3. A "Luxurious/Spacious" layout focusing on aesthetics.

    Also suggest a unique 'colorTheme' for each that perfectly matches the ${inputs.style} style.
    For the 'estimatedCost', provide a realistic range based on ${inputs.budget} finishes.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are an expert residential architect specializing in practical and aesthetic home designs. Provide detailed descriptions for rooms to help with 3D visualization.",
        temperature: 0.7,
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text) as GeneratedLayout[];
      // Add IDs and timestamp locally
      return parsedData.map(layout => ({
        ...layout,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating plans:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string): Promise<string | undefined> => {
  if (!apiKey) return undefined;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9" // Cinematic wide aspect ratio for better architectural views
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  } catch (error) {
    console.error("Error generating image:", error);
    return undefined; // Fail gracefully
  }
};