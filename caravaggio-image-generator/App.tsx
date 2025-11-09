import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import Spinner from './components/Spinner';

type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

const PaintBrushIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("A striking image of a modern-day interpretation inspired by Caravaggio's style, or a powerful detail from one of his works that encapsulates his spirit.");
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const aspectRatios: AspectRatio[] = ['16:9', '9:16', '4:3', '3:4', '1:1'];

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setImageUrl(null);
        try {
            const base64Image = await generateImage(prompt, aspectRatio);
            setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <PaintBrushIcon className="h-8 w-8 text-amber-400" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                            Caravaggio AI
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">Generate modern art in the dramatic style of the master.</p>
                </header>

                <main className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-amber-300 mb-2">
                                Your Vision
                            </label>
                            <textarea
                                id="prompt"
                                rows={4}
                                className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 resize-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., A lone figure in a dimly lit room, illuminated by a single beam of light from a laptop screen..."
                            />
                        </div>

                        <div>
                            <label htmlFor="aspectRatio" className="block text-sm font-medium text-amber-300 mb-2">
                                Canvas Shape
                            </label>
                            <select
                                id="aspectRatio"
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                                className="w-full sm:w-1/2 lg:w-1/3 bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                            >
                                {aspectRatios.map((ratio) => (
                                    <option key={ratio} value={ratio}>{`${ratio}`}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            className="w-full flex items-center justify-center gap-3 bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 transform hover:scale-105 active:scale-100"
                        >
                             {isLoading ? (
                                <>
                                    <Spinner />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <PaintBrushIcon className="h-5 w-5"/>
                                    <span>Generate Masterpiece</span>
                                </>
                            )}
                        </button>
                    </div>
                </main>

                <section className="mt-8">
                    <div className="bg-black/20 border border-gray-800 rounded-2xl p-4 min-h-[400px] flex items-center justify-center">
                         {isLoading && (
                            <div className="text-center text-gray-400">
                                <Spinner />
                                <p className="mt-4 text-lg animate-pulse">Summoning the chiaroscuro...</p>
                            </div>
                        )}
                        {error && (
                            <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                                <h3 className="font-bold">Generation Failed</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {imageUrl && !isLoading && (
                            <img 
                                src={imageUrl} 
                                alt="Generated art in the style of Caravaggio" 
                                className="rounded-lg shadow-lg max-w-full h-auto object-contain" 
                            />
                        )}
                        {!isLoading && !error && !imageUrl && (
                             <div className="text-center text-gray-500">
                                <PaintBrushIcon className="h-16 w-16 mx-auto mb-4"/>
                                <p className="text-xl">Your canvas awaits.</p>
                                <p>Describe your vision and click generate.</p>
                            </div>
                        )}
                    </div>
                </section>
                 <footer className="text-center mt-8 text-gray-600 text-sm">
                    <p>Powered by Google Gemini & Imagen 4.0</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
