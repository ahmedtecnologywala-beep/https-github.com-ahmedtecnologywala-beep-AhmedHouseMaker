import React, { useState, useEffect } from 'react';
import { 
  PlanInputs, 
  Unit, 
  Style, 
  Priority, 
  GeneratedLayout 
} from '../types';
import { generateFloorPlans, generateImage } from '../services/geminiService';
import { Loader2, Download, Share, ChevronRight, Save, Eye, Trash2, Camera, Palette, Sparkles, Check, ArrowDownToLine, X, Ruler } from 'lucide-react';

interface GeneratorProps {
  initialView?: 'new' | 'saved';
}

const Generator: React.FC<GeneratorProps> = ({ initialView = 'new' }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'saved'>(initialView);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState<string | null>(null); // ID of item being generated
  const [results, setResults] = useState<GeneratedLayout[]>([]);
  const [savedProjects, setSavedProjects] = useState<GeneratedLayout[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Image Modal State
  const [selectedImage, setSelectedImage] = useState<{src: string, title: string} | null>(null);

  const [inputs, setInputs] = useState<PlanInputs>({
    plotArea: 200,
    unit: Unit.SQ_YD,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    style: Style.MODERN,
    priority: Priority.SPACE_SAVING,
    budget: 'Medium'
  });

  useEffect(() => {
    // Load saved projects
    const saved = localStorage.getItem('ahmed_house_maker_projects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const saveToLocal = (projects: GeneratedLayout[]) => {
    localStorage.setItem('ahmed_house_maker_projects', JSON.stringify(projects));
    setSavedProjects(projects);
  };

  const handleSaveProject = (plan: GeneratedLayout) => {
    const exists = savedProjects.find(p => p.id === plan.id);
    if (exists) return;
    const newSaved = [plan, ...savedProjects];
    saveToLocal(newSaved);
  };

  const handleDeleteProject = (id: string) => {
    const newSaved = savedProjects.filter(p => p.id !== id);
    saveToLocal(newSaved);
  };

  const handleInputChange = (field: keyof PlanInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const downloadImage = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setStep(2); // Loading State
    
    try {
      const data = await generateFloorPlans(inputs);
      setResults(data);
      setStep(3); // Results State
    } catch (err) {
      setError("Failed to generate plans. Please check your internet connection or API key.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate3D = async (planIndex: number, type: 'exterior' | 'room' | 'structure', roomIndex?: number) => {
    const isExterior = type === 'exterior';
    const isStructure = type === 'structure';
    
    const planId = results[planIndex].id;
    let id = '';
    if (isExterior) id = `ext-${planId}`;
    else if (isStructure) id = `struct-${planId}`;
    else id = `room-${planId}-${roomIndex}`;
    
    setImageLoading(id);

    try {
      let prompt = "";
      const currentPlan = results[planIndex]; 

      if (isExterior) {
        prompt = `Professional architectural 3D render of a ${inputs.style} house exterior, ${inputs.plotArea} ${inputs.unit}, photorealistic, day time, 8k resolution, cinematic lighting, wide angle.`;
      } else if (isStructure) {
        prompt = `Technical architectural structural blueprint of a house floor plan, white lines on blue background, CAD drawing style, detailed engineering structural plan, dimensions, measurements, top down view.`;
      } else if (typeof roomIndex === 'number') {
        const room = currentPlan.rooms[roomIndex];
        prompt = `Professional interior design 3D render of a ${room.name}, ${inputs.style} style, ${room.description}, photorealistic, architectural visualization, 8k resolution, interior design magazine quality.`;
      }

      const base64Image = await generateImage(prompt);
      
      if (base64Image) {
        setResults(prevResults => {
          const newResults = [...prevResults];
          if (!newResults[planIndex]) return prevResults;

          if (isExterior) {
            newResults[planIndex] = { ...newResults[planIndex], exteriorImage: base64Image };
          } else if (isStructure) {
            newResults[planIndex] = { ...newResults[planIndex], structureImage: base64Image };
          } else if (typeof roomIndex === 'number') {
            const newRooms = [...newResults[planIndex].rooms];
            newRooms[roomIndex] = { ...newRooms[roomIndex], generatedImage: base64Image };
            newResults[planIndex] = { ...newResults[planIndex], rooms: newRooms };
          }
          
          const savedIndex = savedProjects.findIndex(p => p.id === planId);
          if (savedIndex >= 0) {
             const newSaved = [...savedProjects];
             newSaved[savedIndex] = newResults[planIndex];
             saveToLocal(newSaved);
          }
          
          return newResults;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImageLoading(null);
    }
  };

  const handleGenerateAll3D = async (planIndex: number) => {
    const plan = results[planIndex];
    if (!plan.exteriorImage) await handleGenerate3D(planIndex, 'exterior');
    if (!plan.structureImage) await handleGenerate3D(planIndex, 'structure');
    for (let i = 0; i < plan.rooms.length; i++) {
      if (!plan.rooms[i].generatedImage) {
        await handleGenerate3D(planIndex, 'room', i);
      }
    }
  };

  const renderPlanCard = (plan: GeneratedLayout, idx: number, isSavedView: boolean) => {
    const isSaved = savedProjects.some(p => p.id === plan.id);
    
    return (
      <div key={plan.id} className="bg-brand-gray rounded-xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col hover:border-brand-accent/50 transition-colors mb-8">
        
        {/* Images Grid (Exterior + Structure) */}
        <div className="grid grid-cols-2 h-64 border-b border-gray-800">
           {/* Exterior */}
           <div className="relative bg-gray-900 group overflow-hidden border-r border-gray-800">
              {plan.exteriorImage ? (
                <>
                   <img 
                      src={plan.exteriorImage} 
                      alt="3D Exterior" 
                      onClick={() => setSelectedImage({src: plan.exteriorImage!, title: `${plan.name} - Exterior`})}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100" 
                   />
                   <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur">Exterior</div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                   {!isSavedView && (
                     <button 
                       onClick={() => handleGenerate3D(idx, 'exterior')}
                       disabled={!!imageLoading}
                       className="px-3 py-1.5 bg-brand-accent text-black rounded-md text-xs font-bold shadow hover:bg-white disabled:opacity-50 flex items-center"
                     >
                       {imageLoading === `ext-${plan.id}` ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                       3D Exterior
                     </button>
                   )}
                </div>
              )}
           </div>

           {/* Structure */}
           <div className="relative bg-gray-900 group overflow-hidden">
              {plan.structureImage ? (
                <>
                   <img 
                      src={plan.structureImage} 
                      alt="Structural Blueprint" 
                      onClick={() => setSelectedImage({src: plan.structureImage!, title: `${plan.name} - Structure`})}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100" 
                   />
                   <div className="absolute top-2 left-2 bg-blue-900/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur">Blueprint</div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                   <Ruler className="w-8 h-8 mb-2 opacity-20" />
                   <p className="text-[10px] mb-2">Structure Plan</p>
                   {!isSavedView && (
                     <button 
                       onClick={() => handleGenerate3D(idx, 'structure')}
                       disabled={!!imageLoading}
                       className="px-3 py-1.5 border border-brand-accent text-brand-accent rounded-md text-xs font-bold hover:bg-brand-accent hover:text-black disabled:opacity-50 flex items-center"
                     >
                       {imageLoading === `struct-${plan.id}` ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Ruler className="w-3 h-3 mr-1" />}
                       Generate
                     </button>
                   )}
                </div>
              )}
           </div>
        </div>
  
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
             <div>
               <h3 className="text-xl font-bold text-white">{plan.name}</h3>
               <p className="text-xs text-gray-500">{new Date(plan.createdAt).toLocaleDateString()}</p>
             </div>
             {isSavedView ? (
               <button onClick={() => handleDeleteProject(plan.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-900/20 rounded-full transition-colors">
                 <Trash2 className="w-5 h-5" />
               </button>
             ) : (
               <button 
                  onClick={() => handleSaveProject(plan)} 
                  className={`p-2 rounded-full transition-colors ${isSaved ? 'text-brand-accent bg-brand-accent/10' : 'text-gray-500 hover:text-brand-accent hover:bg-gray-800'}`}
               >
                 {isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
               </button>
             )}
          </div>
          
          <p className="text-sm text-gray-400 mb-4 italic">"{plan.description}"</p>
  
          {/* Color Palette */}
          <div className="mb-6 bg-black/40 p-4 rounded-lg border border-gray-800">
             <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-bold uppercase text-gray-500">Theme: {plan.colorTheme.name}</span>
             </div>
             <div className="flex gap-3 mb-2">
                <div className="flex flex-col items-center">
                    <div className="h-10 w-14 rounded-md shadow-sm border border-gray-700" style={{ backgroundColor: plan.colorTheme.primary }}></div>
                    <span className="text-[10px] text-gray-500 mt-1">Primary</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-10 w-14 rounded-md shadow-sm border border-gray-700" style={{ backgroundColor: plan.colorTheme.secondary }}></div>
                    <span className="text-[10px] text-gray-500 mt-1">Secondary</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-10 w-14 rounded-md shadow-sm border border-gray-700" style={{ backgroundColor: plan.colorTheme.accent }}></div>
                    <span className="text-[10px] text-gray-500 mt-1">Accent</span>
                </div>
             </div>
          </div>
  
          {/* Room Stats */}
          <div className="space-y-4 mb-6 flex-1">
             <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Layout & Views</h4>
                 {!isSavedView && (
                   <button 
                     onClick={() => handleGenerateAll3D(idx)}
                     disabled={!!imageLoading}
                     className="text-[10px] font-bold text-brand-accent flex items-center bg-brand-accent/10 px-2 py-1 rounded hover:bg-brand-accent hover:text-black transition-colors"
                   >
                     {imageLoading && imageLoading.startsWith(`room-${plan.id}`) ? <Loader2 className="w-3 h-3 animate-spin mr-1"/> : <Sparkles className="w-3 h-3 mr-1"/>}
                     Generate All 3D
                   </button>
                 )}
             </div>

             {plan.rooms.map((room, rIdx) => (
                 <div key={rIdx} className="bg-gray-900 border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition-colors grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    
                    <div className="order-2 md:order-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-gray-200">{room.name}</span>
                            <span className="text-xs bg-gray-800 text-gray-400 px-1.5 rounded border border-gray-700">{room.size}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{room.description}</p>
                    </div>

                    <div className="order-1 md:order-2 h-24 w-full bg-black rounded-lg overflow-hidden relative group border border-gray-800 flex items-center justify-center">
                        {room.generatedImage ? (
                            <>
                                <img 
                                  src={room.generatedImage} 
                                  alt={room.name} 
                                  onClick={() => setSelectedImage({src: room.generatedImage!, title: `${plan.name} - ${room.name}`})}
                                  className="w-full h-full object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity" 
                                />
                                <button 
                                    onClick={(e) => { e.stopPropagation(); downloadImage(room.generatedImage!, `${plan.name}-${room.name}.png`); }}
                                    className="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-accent hover:text-black"
                                >
                                    <ArrowDownToLine className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            !isSavedView ? (
                                <button 
                                    onClick={() => handleGenerate3D(idx, 'room', rIdx)}
                                    disabled={!!imageLoading}
                                    className="flex flex-col items-center justify-center text-gray-500 hover:text-brand-accent w-full h-full transition-colors"
                                >
                                    {imageLoading === `room-${plan.id}-${rIdx}` ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Camera className="w-5 h-5 opacity-50" />
                                    )}
                                </button>
                            ) : (
                                <Camera className="w-5 h-5 text-gray-700" />
                            )
                        )}
                    </div>
                 </div>
             ))}
          </div>
  
          {/* Estimate */}
          <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-800">
             <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-semibold uppercase">Estimated Cost</span>
                <span className="text-lg font-bold text-brand-accent">{plan.estimatedCost}</span>
             </div>
          </div>
  
          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
             <button className="flex items-center justify-center py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 text-xs font-medium text-white transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
             </button>
             <button className="flex items-center justify-center py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 text-xs font-medium text-white transition-colors">
                <Share className="w-4 h-4 mr-2" />
                Share
             </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
           <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-gray-700" />
              <div className="flex items-center justify-between w-full mt-4 text-white">
                 <h3 className="text-lg font-bold">{selectedImage.title}</h3>
                 <div className="flex gap-4">
                    <button onClick={() => downloadImage(selectedImage.src, `${selectedImage.title}.png`)} className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors">
                       <ArrowDownToLine size={20} /> Download
                    </button>
                    <button onClick={() => setSelectedImage(null)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white">
                       <X size={24} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 border-b border-gray-800">
         <button 
           onClick={() => setActiveTab('new')}
           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'new' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
         >
           New Project
         </button>
         <button 
           onClick={() => setActiveTab('saved')}
           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'saved' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
         >
           Saved Projects ({savedProjects.length})
         </button>
      </div>

      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {savedProjects.length === 0 ? (
               <div className="col-span-full text-center py-20 text-gray-500 bg-gray-900 rounded-lg border-2 border-dashed border-gray-800">
                   <Save className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                   <p className="text-lg font-medium">No saved projects yet.</p>
                   <button onClick={() => setActiveTab('new')} className="mt-4 text-brand-accent font-semibold hover:underline">
                      Create your first design
                   </button>
               </div>
           ) : (
               savedProjects.map((plan, idx) => renderPlanCard(plan, idx, true))
           )}
        </div>
      )}

      {activeTab === 'new' && (
        <>
          {/* Step 1: Input Form */}
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-brand-gray rounded-2xl shadow-xl overflow-hidden border border-gray-800">
                <div className="bg-brand-accent px-8 py-6">
                  <h2 className="text-2xl font-bold text-black">Ahmed House Maker</h2>
                  <p className="text-black/80 mt-1">Enter plot details for instant AI maps & 3D models.</p>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Plot Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Plot Specifications</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Plot Size</label>
                        <input
                          type="number"
                          value={inputs.plotArea}
                          onChange={(e) => handleInputChange('plotArea', Number(e.target.value))}
                          className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Unit</label>
                        <select
                          value={inputs.unit}
                          onChange={(e) => handleInputChange('unit', e.target.value as Unit)}
                          className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                        >
                          {Object.values(Unit).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Floors</label>
                      <div className="flex gap-4">
                        {[1, 2, 3].map(num => (
                          <button
                            key={num}
                            onClick={() => handleInputChange('floors', num)}
                            className={`flex-1 py-2 rounded-lg border ${inputs.floors === num ? 'bg-brand-accent text-black border-brand-accent font-bold' : 'bg-brand-surface text-gray-400 border-gray-700 hover:bg-gray-800'}`}
                          >
                            {num} {num === 1 ? 'Floor' : 'Floors'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Room Requirements */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Requirements</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bedrooms</label>
                        <select
                          value={inputs.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', Number(e.target.value))}
                          className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                        >
                          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bathrooms</label>
                        <select
                          value={inputs.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', Number(e.target.value))}
                          className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                        >
                           {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Design Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.values(Style).map(s => (
                          <button
                            key={s}
                            onClick={() => handleInputChange('style', s)}
                            className={`text-sm py-2 px-3 rounded-lg border text-left ${inputs.style === s ? 'bg-brand-accent/20 border-brand-accent text-brand-accent font-medium' : 'border-gray-700 bg-brand-surface text-gray-500 hover:bg-gray-800'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Priorities & Budget</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-gray-400 mb-1">Top Priority</label>
                         <select
                            value={inputs.priority}
                            onChange={(e) => handleInputChange('priority', e.target.value as Priority)}
                            className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                          >
                            {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Budget Level</label>
                         <div className="flex bg-brand-surface rounded-lg p-1 border border-gray-700">
                            {['Low', 'Medium', 'High'].map(b => (
                              <button
                                key={b}
                                onClick={() => handleInputChange('budget', b)}
                                className={`flex-1 text-sm py-1.5 rounded-md transition-all ${inputs.budget === b ? 'bg-brand-accent text-black shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-300'}`}
                              >
                                {b}
                              </button>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6 bg-gray-900 border-t border-gray-800 flex justify-end">
                   <button 
                      onClick={handleGenerate}
                      disabled={loading}
                      className="flex items-center bg-brand-accent text-black px-8 py-3 rounded-lg hover:bg-white transition-colors text-lg font-bold shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                      {loading ? 'Designing...' : 'Generate Map & 3D'} <ChevronRight className="ml-2 w-5 h-5" />
                   </button>
                </div>
              </div>
              {error && (
                  <div className="mt-4 p-4 bg-red-900/30 text-red-200 border border-red-800 rounded-lg">
                      {error}
                  </div>
              )}
            </div>
          )}

          {/* Step 2: Loading */}
          {step === 2 && (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-gray-800 border-t-brand-accent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Loader2 className="w-8 h-8 text-brand-accent animate-pulse" />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-bold text-white">Designing Your Home...</h2>
              <p className="text-gray-500 mt-2 max-w-md">Our AI architect is creating 3 distinct layouts, color themes, structural blueprints and estimating costs.</p>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
             <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white">Your AI Designs</h2>
                    <p className="text-gray-500">Save your favorite layouts to access them later.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-brand-accent border border-brand-accent px-4 py-2 rounded-lg hover:bg-brand-accent hover:text-black transition-colors">
                    Start New Project
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {results.map((plan, idx) => renderPlanCard(plan, idx, false))}
                </div>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default Generator;