import { GoogleGenAI } from "@google/genai";

type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("Image generation failed: No image data received from API.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        if (error instanceof Error) {
            // Provide a more user-friendly error message
            if (error.message.includes('API_KEY')) {
                 throw new Error(`Authentication error. Please check your API key.`);
            }
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
};
