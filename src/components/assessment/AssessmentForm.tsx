"use client";

import { useState } from "react";
import {
  User, Calendar, Ruler, Scale, Mail, Phone, ArrowLeft, ArrowRight, Lightbulb, ShieldCheck,
  Target, Flame, BicepsFlexed, Dumbbell, Activity, Heart, RefreshCcw, MoreHorizontal,
  Briefcase, Footprints, Moon, Smile, Check, ClipboardCheck, Pill, Bandage, Leaf, Camera, FileText, Lock, Send, Edit3, AlertCircle
} from "lucide-react";

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // -- Form State --
  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [activityLevel, setActivityLevel] = useState<string | null>(null);

  // Step 2
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState("");
  const [frequency, setFrequency] = useState("");
  const [equipment, setEquipment] = useState<string | null>(null);
  const [cardio, setCardio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [stress, setStress] = useState("");
  const [diet, setDiet] = useState<string | null>(null);
  const [meals, setMeals] = useState("");
  const [alcohol, setAlcohol] = useState<string | null>(null);
  const [tobacco, setTobacco] = useState<string | null>(null);
  const [supplements, setSupplements] = useState("");

  // Step 3
  const [conditions, setConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [injuries, setInjuries] = useState("");
  const [allergies, setAllergies] = useState("");
  const [waist, setWaist] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [physiqueImage, setPhysiqueImage] = useState<File | null>(null);
  const [bloodReport, setBloodReport] = useState<File | null>(null);

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!age.trim()) newErrors.age = "Age is required";
    if (!gender) newErrors.gender = "Please select gender";
    if (!height.trim()) newErrors.height = "Height is required";
    if (!weight.trim()) newErrors.weight = "Weight is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!activityLevel) newErrors.activityLevel = "Please select an activity level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!primaryGoal) newErrors.primaryGoal = "Please select a primary goal";
    if (!experience) newErrors.experience = "Please select experience level";
    if (!frequency) newErrors.frequency = "Please select frequency";
    if (!equipment) newErrors.equipment = "Please select equipment access";
    if (!cardio) newErrors.cardio = "Please select cardio routine";
    if (!occupation.trim()) newErrors.occupation = "Occupation is required";
    if (!steps.trim()) newErrors.steps = "Daily steps are required";
    if (!sleep.trim()) newErrors.sleep = "Sleep hours are required";
    if (!stress) newErrors.stress = "Please select stress level";
    if (!diet) newErrors.diet = "Please select dietary preference";
    if (!meals) newErrors.meals = "Please select number of meals";
    if (!alcohol) newErrors.alcohol = "Required";
    if (!tobacco) newErrors.tobacco = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!conditions.trim()) newErrors.conditions = "Required field";
    if (!medications.trim()) newErrors.medications = "Required field";
    if (!injuries.trim()) newErrors.injuries = "Required field";
    if (!allergies.trim()) newErrors.allergies = "Required field";
    if (!waist.trim()) newErrors.waist = "Waist measurement required";
    if (!commitmentLevel) newErrors.commitmentLevel = "Please select your commitment level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      const formContainer = document.getElementById("form-scroll-container");
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      const formContainer = document.getElementById("form-scroll-container");
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to top to show errors if any
      const formContainer = document.getElementById("form-scroll-container");
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      const formContainer = document.getElementById("form-scroll-container");
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      try {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age.toString());
        formData.append('gender', gender || '');
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('activityLevel', activityLevel || '');
        formData.append('primaryGoal', primaryGoal || '');
        formData.append('experience', experience);
        formData.append('frequency', frequency);
        formData.append('equipment', equipment || '');
        formData.append('cardio', cardio);
        formData.append('occupation', occupation);
        formData.append('steps', steps);
        formData.append('sleep', sleep);
        formData.append('stress', stress);
        formData.append('diet', diet || '');
        formData.append('meals', meals);
        formData.append('alcohol', alcohol || '');
        formData.append('tobacco', tobacco || '');
        if (supplements) formData.append('supplements', supplements);
        formData.append('conditions', conditions);
        formData.append('medications', medications);
        formData.append('injuries', injuries);
        formData.append('allergies', allergies);
        formData.append('waist', waist);
        formData.append('commitmentLevel', commitmentLevel?.toString() || '1');
        if (notes) formData.append('notes', notes);

        if (physiqueImage) formData.append('physiqueImage', physiqueImage);
        if (bloodReport) formData.append('bloodReport', bloodReport);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assessments`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          setIsSubmitted(true);
        } else {
          alert("Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        alert("Error submitting form");
      }
    } else {
      const formContainer = document.getElementById("form-scroll-container");
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const ErrorMsg = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <span className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1 animate-in fade-in">
        <AlertCircle className="w-3 h-3" /> {errors[field]}
      </span>
    );
  };

  const inputClasses = (field: string) =>
    `w-full bg-[#1a1a1a] border rounded-lg py-3 px-4 text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${errors[field]
      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
      : 'border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50'
    }`;

  const selectClasses = (field: string) =>
    `w-full bg-[#1a1a1a] border rounded-lg py-3 pl-4 pr-10 text-white text-sm focus:outline-none transition-all appearance-none cursor-pointer ${errors[field]
      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
      : 'border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50'
    }`;

  if (isSubmitted) {
    return (
      <div className="flex-1 bg-[#09090b] flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
          <Dumbbell className="w-12 h-12 text-primary animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Assessment Submitted!</h2>
        <p className="text-zinc-400 max-w-md mx-auto text-lg leading-relaxed">
          Boom! You've taken the first step towards your fitness goals. We will review your details and reach out to you shortly. Get ready to crush it! 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#09090b] flex flex-col h-full">
      {/* Top Progress Indicator */}
      <div className="px-8 py-6 border-b border-white/5 bg-[#0c0c0c] flex items-center justify-between overflow-x-auto custom-scrollbar">

        {/* Step 1 Indicator */}
        <div className={`flex items-center gap-4 min-w-max pr-8 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm relative transition-colors ${step > 1 ? 'border-primary bg-primary text-black' : step === 1 ? 'border-primary text-primary' : 'border-white/20 text-white/50'}`}>
            {step > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
            {step === 1 && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-t-md" />}
          </div>
          <div>
            <div className={`text-sm font-bold tracking-wide ${step >= 1 ? 'text-white' : 'text-zinc-500'}`}>About You</div>
            <div className="text-zinc-500 text-xs hidden sm:block">Personal Information</div>
          </div>
        </div>

        {/* Step 2 Indicator */}
        <div className={`flex items-center gap-4 min-w-max pr-8 relative transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`absolute top-1/2 -translate-y-1/2 -left-12 w-8 h-[1px] ${step >= 2 ? 'bg-primary' : 'bg-white/20'}`} />
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm relative transition-colors ${step > 2 ? 'border-primary bg-primary text-black' : step === 2 ? 'border-primary text-primary' : 'border-white/20 text-white/50'}`}>
            {step > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
            {step === 2 && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-t-md" />}
          </div>
          <div>
            <div className={`text-sm font-bold tracking-wide ${step >= 2 ? 'text-white' : 'text-zinc-500'}`}>Goals & Background</div>
            <div className="text-zinc-500 text-xs hidden sm:block">Fitness & Lifestyle</div>
          </div>
        </div>

        {/* Step 3 Indicator */}
        <div className={`flex items-center gap-4 min-w-max relative transition-opacity duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`absolute top-1/2 -translate-y-1/2 -left-12 w-8 h-[1px] ${step >= 3 ? 'bg-primary' : 'bg-white/20'}`} />
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm relative transition-colors ${step === 3 ? 'border-primary text-primary' : 'border-white/20 text-white/50'}`}>
            3
            {step === 3 && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-t-md" />}
          </div>
          <div>
            <div className={`text-sm font-bold tracking-wide ${step >= 3 ? 'text-white' : 'text-zinc-500'}`}>Health & Additional Info</div>
            <div className="text-zinc-500 text-xs hidden sm:block">Medical, Nutrition & More</div>
          </div>
        </div>

      </div>

      <div id="form-scroll-container" data-lenis-prevent="true" className="flex-1 overflow-y-auto scrollbar-hide p-8 lg:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl relative">

          {/* STEP 1 CONTENT */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-2">ABOUT YOU</h2>
                  <p className="text-zinc-400 text-sm">Let&apos;s start with some basic information.</p>
                </div>
                <div className="text-primary text-sm font-bold tracking-wide border border-primary/20 bg-primary/5 px-4 py-2 rounded-full hidden sm:block">
                  Step 1 of 3
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row 1: First Name & Last Name */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">First Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-4 w-4 ${errors.firstName ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value); clearError('firstName'); }}
                        className={`${inputClasses('firstName')} pl-10`}
                        placeholder="Enter first name"
                      />
                    </div>
                    <ErrorMsg field="firstName" />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Last Name / Title <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-4 w-4 ${errors.lastName ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value); clearError('lastName'); }}
                        className={`${inputClasses('lastName')} pl-10`}
                        placeholder="Enter last name or title"
                      />
                    </div>
                    <ErrorMsg field="lastName" />
                  </div>

                  {/* Row 2: Age & Gender */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Age <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className={`h-4 w-4 ${errors.age ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                        value={age}
                        onChange={(e) => { setAge(e.target.value); clearError('age'); }}
                        className={`${inputClasses('age')} pl-10`}
                        placeholder="Enter your age"
                      />
                    </div>
                    <ErrorMsg field="age" />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Gender <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div
                        onClick={() => setGenderOpen(!genderOpen)}
                        className={`w-full bg-[#1a1a1a] border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none transition-all cursor-pointer flex items-center justify-between ${errors.gender ? 'border-red-500/50 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/30'}`}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className={`h-4 w-4 ${errors.gender ? 'text-red-500' : 'text-primary'}`} />
                        </div>
                        <span className={gender ? "text-white" : "text-zinc-600"}>{gender || "Select gender"}</span>
                        <svg className={`w-4 h-4 text-zinc-500 transition-transform ${genderOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>

                      {genderOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setGenderOpen(false)} />
                          <div className="absolute top-full left-0 mt-2 w-full bg-[#222] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            {["Male", "Female", "Other"].map(opt => (
                              <div
                                key={opt}
                                onClick={() => {
                                  setGender(opt);
                                  setGenderOpen(false);
                                  clearError('gender');
                                }}
                                className="px-4 py-3 text-sm text-zinc-300 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors border-b border-white/5 last:border-0"
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <ErrorMsg field="gender" />
                  </div>

                  {/* Row 3: Height & Weight */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Height <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Ruler className={`h-4 w-4 ${errors.height ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="text"
                        value={height}
                        onChange={(e) => { setHeight(e.target.value); clearError('height'); }}
                        className={`${inputClasses('height')} pl-10`}
                        placeholder="Enter height (cm)"
                      />
                    </div>
                    <ErrorMsg field="height" />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Current Weight <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Scale className={`h-4 w-4 ${errors.weight ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => { setWeight(e.target.value); clearError('weight'); }}
                        className={`${inputClasses('weight')} pl-10`}
                        placeholder="Enter weight (kg)"
                      />
                    </div>
                    <ErrorMsg field="weight" />
                  </div>

                  {/* Row 4: Email & Phone */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-4 w-4 ${errors.email ? 'text-red-500' : 'text-primary'}`} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                        className={`${inputClasses('email')} pl-10`}
                        placeholder="Enter your email"
                      />
                    </div>
                    <ErrorMsg field="email" />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Phone Number <span className="text-red-500">*</span></label>
                    <div className={`flex h-[46px] border rounded-lg bg-[#1a1a1a] transition-all overflow-hidden ${errors.phone ? 'border-red-500/50 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/50' : 'border-white/10 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50'}`}>

                      {/* Fixed +91 Prefix */}
                      <div className="flex items-center pl-3 pr-3 border-r border-white/10 bg-[#1a1a1a]">
                        <span className="text-xl leading-none">🇮🇳</span>
                        <span className="text-white text-sm ml-2 font-medium">+91</span>
                      </div>

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); clearError('phone'); }}
                        className="flex-1 bg-transparent px-4 text-white text-sm focus:outline-none placeholder:text-zinc-600 h-full"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <ErrorMsg field="phone" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-white text-sm font-semibold flex items-center gap-1">Current Activity Level <span className="text-red-500">*</span></label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'A', title: 'Sedentary', desc: '(mostly sitting)', icon: '🛋️' },
                      { id: 'B', title: 'Lightly active', desc: '(1-3 days/week)', icon: '🚶' },
                      { id: 'C', title: 'Moderately active', desc: '(3-5 days/week)', icon: '🏃' },
                      { id: 'D', title: 'Very active', desc: '(6-7 days/week)', icon: '🏋️' }
                    ].map((item) => {
                      const isActive = activityLevel === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => { setActivityLevel(item.id); clearError('activityLevel'); }}
                          className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]' : errors.activityLevel ? 'bg-red-500/5 border-red-500/50 hover:border-red-500' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                        >
                          {isActive && (
                            <div className="absolute top-0 right-0 bg-primary text-black w-6 h-6 flex items-center justify-center rounded-bl-lg rounded-tr-xl">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                          )}
                          <div className="flex flex-col items-center text-center gap-3">
                            <div className={`text-2xl ${isActive ? '' : 'opacity-70'}`}>{item.icon}</div>
                            <div>
                              <div className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.id}</div>
                              <div className={`text-sm ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.title}</div>
                              <div className={`text-xs mt-1 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <ErrorMsg field="activityLevel" />
                </div>

                <div className="bg-[#1a1a1a] border border-white/5 rounded-lg p-4 flex items-center gap-3 mt-6">
                  <Lightbulb className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-zinc-400 text-xs sm:text-sm">Be honest about your activity level. It helps me create the safest and most effective plan for you.</p>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button type="button" disabled className="opacity-50 cursor-not-allowed group flex items-center justify-center h-12 px-6 bg-transparent border border-white/10 text-white text-sm font-bold tracking-wide uppercase transition-all rounded-md w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </button>

                  <div className="flex-1 max-w-xs w-full flex flex-col items-center gap-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3 rounded-full transition-all duration-500" />
                    </div>
                    <span className="text-zinc-500 text-xs">Step 1 of 3</span>
                  </div>

                  <button type="button" onClick={handleNext} className="group flex items-center justify-center h-12 px-8 bg-primary text-black text-sm font-black tracking-wide uppercase transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] rounded-md w-full sm:w-auto">
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2 CONTENT */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Target className="w-10 h-10 text-primary stroke-[1.5]" />
                  <div>
                    <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-1">YOUR GOALS & BACKGROUND</h2>
                    <p className="text-zinc-400 text-sm">Tell me about your goals, training experience and lifestyle.</p>
                  </div>
                </div>
                <div className="text-primary text-sm font-bold tracking-wide border border-primary/20 bg-primary/5 px-4 py-2 rounded-full hidden sm:block">
                  Step 2 of 3
                </div>
              </div>

              <form className="space-y-10">
                <div className="space-y-4 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">1.</span> Primary Goal <span className="text-zinc-500 text-sm font-normal ml-1">(Select your main goal)</span> <span className="text-red-500 text-sm">*</span>
                  </h3>

                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {[
                      { id: 'A', title: 'Fat Loss', icon: Flame },
                      { id: 'B', title: 'Muscle Gain', icon: BicepsFlexed },
                      { id: 'C', title: 'Strength', icon: Dumbbell },
                      { id: 'D', title: 'Performance', icon: Activity },
                      { id: 'E', title: 'General Health', icon: Heart },
                      { id: 'F', title: 'Body Recomposition', icon: RefreshCcw },
                      { id: 'G', title: 'Other', icon: MoreHorizontal }
                    ].map((item) => {
                      const isActive = primaryGoal === item.id;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => { setPrimaryGoal(item.id); clearError('primaryGoal'); }}
                          className={`min-w-[140px] flex-1 snap-start relative p-5 rounded-xl border cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]' : errors.primaryGoal ? 'bg-red-500/5 border-red-500/50 hover:border-red-500' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                        >
                          {isActive && (
                            <div className="absolute top-0 right-0 bg-primary text-black w-6 h-6 flex items-center justify-center rounded-bl-lg rounded-tr-xl">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                          )}
                          <div className="flex flex-col items-center text-center gap-3">
                            <Icon className={`w-8 h-8 ${isActive ? 'text-primary' : 'text-primary'}`} />
                            <div>
                              <div className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.id}</div>
                              <div className={`text-sm ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.title}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <ErrorMsg field="primaryGoal" />
                </div>

                <div className="space-y-6 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">2.</span> Training Background
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Years of resistance<br />training experience <span className="text-red-500">*</span></label>
                      <div className="relative mt-2">
                        <select
                          value={experience}
                          onChange={(e) => { setExperience(e.target.value); clearError('experience'); }}
                          className={`${selectClasses('experience')}`}
                        >
                          <option value="" disabled className="text-zinc-600">Select experience</option>
                          <option value="none">None</option>
                          <option value="1">1 Year</option>
                          <option value="2-3">2-3 Years</option>
                          <option value="4+">4+ Years</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="experience" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Current workout<br />frequency <span className="text-red-500">*</span></label>
                      <div className="relative mt-2">
                        <select
                          value={frequency}
                          onChange={(e) => { setFrequency(e.target.value); clearError('frequency'); }}
                          className={`${selectClasses('frequency')}`}
                        >
                          <option value="" disabled className="text-zinc-600">Select frequency</option>
                          <option value="0">0 days</option>
                          <option value="1-2">1-2 days/week</option>
                          <option value="3-4">3-4 days/week</option>
                          <option value="5+">5+ days/week</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="frequency" />
                    </div>

                    <div className="space-y-2 lg:col-span-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex justify-between items-center w-full">
                        <span>Access to equipment <span className="text-red-500">*</span></span>
                        <span className="hidden lg:inline text-white text-sm font-semibold">Current cardio routine <span className="text-red-500">*</span></span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 h-full">
                        <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2">
                          {[
                            { id: 'Gym', icon: Dumbbell },
                            { id: 'Home Gym', icon: Dumbbell },
                            { id: 'Home', icon: User, desc: '(Bodyweight only)' }
                          ].map((item) => {
                            const isActive = equipment === item.id;
                            const Icon = item.icon;
                            return (
                              <div
                                key={item.id}
                                onClick={() => { setEquipment(item.id); clearError('equipment'); }}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border cursor-pointer transition-all duration-300 text-center gap-1 ${isActive ? 'bg-primary/5 border-primary text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]' : errors.equipment ? 'bg-red-500/5 border-red-500/50 text-zinc-400' : 'bg-[#1a1a1a] border-white/10 hover:border-white/20 text-zinc-400'}`}
                              >
                                <Icon className="w-5 h-5 mb-1" />
                                <span className="text-xs font-bold leading-tight">{item.id}</span>
                                {item.desc && <span className="text-[9px] text-zinc-500 leading-tight">{item.desc}</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="col-span-1 flex flex-col">
                          <label className="lg:hidden text-white text-sm font-semibold flex items-center gap-1 mb-2 mt-4 md:mt-0">Current cardio routine <span className="text-red-500">*</span></label>
                          <div className="relative h-full min-h-[44px]">
                            <select
                              value={cardio}
                              onChange={(e) => { setCardio(e.target.value); clearError('cardio'); }}
                              className={`${selectClasses('cardio')} h-full`}
                            >
                              <option value="" disabled className="text-zinc-600">Select routine</option>
                              <option value="none">None</option>
                              <option value="light">Light</option>
                              <option value="intense">Intense</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="w-2/3"><ErrorMsg field="equipment" /></div>
                        <div className="w-1/3 pl-2"><ErrorMsg field="cardio" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">3.</span> Lifestyle
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Occupation <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className={`h-4 w-4 ${errors.occupation ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <input
                          type="text"
                          value={occupation}
                          onChange={(e) => { setOccupation(e.target.value); clearError('occupation'); }}
                          className={`${inputClasses('occupation')} pl-10`}
                          placeholder="Enter occupation"
                        />
                      </div>
                      <ErrorMsg field="occupation" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Average daily steps <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Footprints className={`h-4 w-4 ${errors.steps ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <input
                          type="text"
                          value={steps}
                          onChange={(e) => { setSteps(e.target.value); clearError('steps'); }}
                          className={`${inputClasses('steps')} pl-10`}
                          placeholder="e.g. 8000"
                        />
                      </div>
                      <ErrorMsg field="steps" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Sleep (hours) <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Moon className={`h-4 w-4 ${errors.sleep ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <input
                          type="text"
                          value={sleep}
                          onChange={(e) => { setSleep(e.target.value); clearError('sleep'); }}
                          className={`${inputClasses('sleep')} pl-10`}
                          placeholder="e.g. 7-8"
                        />
                      </div>
                      <ErrorMsg field="sleep" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Stress level <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Smile className={`h-4 w-4 ${errors.stress ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <select
                          value={stress}
                          onChange={(e) => { setStress(e.target.value); clearError('stress'); }}
                          className={`${selectClasses('stress')} pl-10 relative z-0`}
                        >
                          <option value="" disabled className="text-zinc-600">Select stress level</option>
                          <option value="low">Low</option>
                          <option value="moderate">Moderate</option>
                          <option value="high">High</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500 z-10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="stress" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">4.</span> Nutrition
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="col-span-1 md:col-span-6 space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">Dietary Preference <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'A', title: 'Vegetarian', icon: '🌱' },
                          { id: 'B', title: 'Eggetarian', icon: '🥚' },
                          { id: 'C', title: 'Non-Vegetarian', icon: '🍗' },
                          { id: 'D', title: 'Vegan', icon: '🌿' }
                        ].map((item) => {
                          const isActive = diet === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => { setDiet(item.id); clearError('diet'); }}
                              className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-300 text-center gap-1 ${isActive ? 'bg-primary/5 border-primary text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]' : errors.diet ? 'bg-red-500/5 border-red-500/50 text-zinc-400' : 'bg-[#1a1a1a] border-white/10 hover:border-white/20 text-zinc-400'}`}
                            >
                              <div className="text-lg">{item.icon}</div>
                              <div className="font-bold text-xs">{item.id}</div>
                              <span className="text-[10px] leading-tight font-medium mt-1">{item.title}</span>
                            </div>
                          );
                        })}
                      </div>
                      <ErrorMsg field="diet" />
                    </div>

                    <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6">
                      <div className="flex flex-col justify-between">
                        <label className="text-white text-xs xl:text-sm font-semibold mb-2 leading-tight">
                          Number of meals/day <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-auto">
                          <select
                            value={meals}
                            onChange={(e) => { setMeals(e.target.value); clearError('meals'); }}
                            className={`${selectClasses('meals')} h-11 xl:h-12 pl-3 xl:pl-4`}
                          >
                            <option value="" disabled className="text-zinc-600">Select meals</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                        <ErrorMsg field="meals" />
                      </div>

                      <div className="flex flex-col justify-between">
                        <label className="text-white text-xs xl:text-sm font-semibold mb-2 leading-tight">
                          Do you consume alcohol? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          <button type="button" onClick={() => { setAlcohol('Yes'); clearError('alcohol'); }} className={`h-11 xl:h-12 rounded-lg border text-sm font-bold transition-all ${alcohol === 'Yes' ? 'bg-primary/10 border-primary text-primary' : errors.alcohol ? 'border-red-500/50 text-red-500' : 'bg-[#1a1a1a] border-white/10 text-zinc-400 hover:border-white/20'}`}>Yes</button>
                          <button type="button" onClick={() => { setAlcohol('No'); clearError('alcohol'); }} className={`h-11 xl:h-12 rounded-lg border text-sm font-bold transition-all ${alcohol === 'No' ? 'bg-primary/10 border-primary text-primary' : errors.alcohol ? 'border-red-500/50 text-red-500' : 'bg-[#1a1a1a] border-white/10 text-zinc-400 hover:border-white/20'}`}>No</button>
                        </div>
                        <ErrorMsg field="alcohol" />
                      </div>

                      <div className="flex flex-col justify-between">
                        <label className="text-white text-xs xl:text-sm font-semibold mb-2 leading-tight">
                          Smoke/use tobacco? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          <button type="button" onClick={() => { setTobacco('Yes'); clearError('tobacco'); }} className={`h-11 xl:h-12 rounded-lg border text-sm font-bold transition-all ${tobacco === 'Yes' ? 'bg-primary/10 border-primary text-primary' : errors.tobacco ? 'border-red-500/50 text-red-500' : 'bg-[#1a1a1a] border-white/10 text-zinc-400 hover:border-white/20'}`}>Yes</button>
                          <button type="button" onClick={() => { setTobacco('No'); clearError('tobacco'); }} className={`h-11 xl:h-12 rounded-lg border text-sm font-bold transition-all ${tobacco === 'No' ? 'bg-primary/10 border-primary text-primary' : errors.tobacco ? 'border-red-500/50 text-red-500' : 'bg-[#1a1a1a] border-white/10 text-zinc-400 hover:border-white/20'}`}>No</button>
                        </div>
                        <ErrorMsg field="tobacco" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-white text-sm font-semibold flex items-center gap-1">Supplements currently using (if any)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="w-4 h-4 border border-zinc-500 rounded-sm" />
                      </div>
                      <input
                        type="text"
                        value={supplements}
                        onChange={(e) => setSupplements(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                        placeholder="e.g. Whey Protein, Creatine, Fish Oil, etc."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button type="button" onClick={handleBack} className="group flex items-center justify-center h-12 px-6 bg-transparent border border-white/10 text-white text-sm font-bold tracking-wide uppercase transition-all hover:bg-white/5 rounded-md w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back
                  </button>

                  <div className="flex-1 max-w-xs w-full flex flex-col items-center gap-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 rounded-full transition-all duration-500" />
                    </div>
                    <span className="text-zinc-500 text-xs">Step 2 of 3</span>
                  </div>

                  <button type="button" onClick={handleNext} className="group flex items-center justify-center h-12 px-8 bg-primary text-black text-sm font-black tracking-wide uppercase transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] rounded-md w-full sm:w-auto">
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3 CONTENT */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <ClipboardCheck className="w-10 h-10 text-primary stroke-[1.5]" />
                  <div>
                    <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-1">HEALTH & ADDITIONAL INFO</h2>
                    <p className="text-zinc-400 text-sm">Almost there! A few final details to help me build the best plan for you.</p>
                  </div>
                </div>
                <div className="text-primary text-sm font-bold tracking-wide border border-primary/20 bg-primary/5 px-4 py-2 rounded-full hidden sm:block">
                  Step 3 of 3
                </div>
              </div>

              <form className="space-y-10" onSubmit={handleSubmit}>

                {/* 1. Medical & Health History */}
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">1.</span> Medical & Health History
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Do you have any diagnosed medical conditions? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Activity className={`h-5 w-5 ${errors.conditions ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <select
                          value={conditions}
                          onChange={(e) => { setConditions(e.target.value); clearError('conditions'); }}
                          className={`${selectClasses('conditions')} pl-12 py-4 h-[54px]`}
                        >
                          <option value="" disabled className="text-zinc-600">Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="conditions" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Are you currently taking any medications? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Pill className={`h-5 w-5 ${errors.medications ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <select
                          value={medications}
                          onChange={(e) => { setMedications(e.target.value); clearError('medications'); }}
                          className={`${selectClasses('medications')} pl-12 py-4 h-[54px]`}
                        >
                          <option value="" disabled className="text-zinc-600">Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="medications" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Any injuries, surgeries, or chronic pain? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Bandage className={`h-5 w-5 ${errors.injuries ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <select
                          value={injuries}
                          onChange={(e) => { setInjuries(e.target.value); clearError('injuries'); }}
                          className={`${selectClasses('injuries')} pl-12 py-4 h-[54px]`}
                        >
                          <option value="" disabled className="text-zinc-600">Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="injuries" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Do you have any dietary allergies/intolerances? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Leaf className={`h-5 w-5 ${errors.allergies ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <select
                          value={allergies}
                          onChange={(e) => { setAllergies(e.target.value); clearError('allergies'); }}
                          className={`${selectClasses('allergies')} pl-12 py-4 h-[54px]`}
                        >
                          <option value="" disabled className="text-zinc-600">Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <ErrorMsg field="allergies" />
                    </div>
                  </div>
                </div>

                {/* 2. Progress Tracking */}
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">2.</span> Progress Tracking
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="col-span-1 md:col-span-4 space-y-2 flex flex-col">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Waist circumference (cm) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Ruler className={`h-5 w-5 ${errors.waist ? 'text-red-500' : 'text-zinc-500'}`} />
                        </div>
                        <input
                          type="text"
                          value={waist}
                          onChange={(e) => { setWaist(e.target.value); clearError('waist'); }}
                          className={`${inputClasses('waist')} pl-12 py-4`}
                          placeholder="Enter measurement"
                        />
                      </div>
                      <ErrorMsg field="waist" />
                    </div>

                    <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Photo Upload (Optional) */}
                      <div className="space-y-2">
                        <label className="text-white text-sm font-semibold flex items-center gap-1">
                          Progress Photos
                        </label>
                        <label className="border-2 border-dashed border-white/20 rounded-xl bg-[#1a1a1a]/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1a1a1a] hover:border-primary/50 transition-all mt-2 h-40 group block">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png"
                            onChange={(e) => setPhysiqueImage(e.target.files?.[0] || null)}
                          />
                          <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform mx-auto">
                            <Camera className="w-6 h-6" />
                          </div>
                          <p className="text-sm text-zinc-300 font-medium truncate w-full px-4">
                            {physiqueImage ? physiqueImage.name : "Click to choose files or drag here"}
                          </p>
                          <p className="text-xs text-zinc-500 mt-2">JPG, PNG (Max. 10MB)</p>
                        </label>
                      </div>

                      {/* Blood Work Upload (Optional) */}
                      <div className="space-y-2">
                        <label className="text-white text-sm font-semibold flex items-center gap-1">
                          Recent blood work
                        </label>
                        <label className="border-2 border-dashed border-white/20 rounded-xl bg-[#1a1a1a]/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1a1a1a] hover:border-primary/50 transition-all mt-2 h-40 group block">
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf, image/jpeg, image/png"
                            onChange={(e) => setBloodReport(e.target.files?.[0] || null)}
                          />
                          <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform mx-auto">
                            <FileText className="w-6 h-6" />
                          </div>
                          <p className="text-sm text-zinc-300 font-medium truncate w-full px-4">
                            {bloodReport ? bloodReport.name : "Click to choose files or drag here"}
                          </p>
                          <p className="text-xs text-zinc-500 mt-2">PDF, JPG (Max. 10MB)</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Commitment & Final Questions */}
                <div className="space-y-8 border-t border-white/10 pt-8">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">3.</span> Commitment & Final Questions
                  </h3>

                  <div className="space-y-8">
                    <div className="space-y-6 flex flex-col">
                      <label className="text-white text-base font-semibold leading-relaxed block max-w-2xl">
                        On a scale of 1-10, how committed are you to following a structured nutrition and training plan for the next 12 weeks? <span className="text-red-500">*</span>
                      </label>

                      <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap max-w-4xl">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <div
                            key={num}
                            onClick={() => { setCommitmentLevel(num); clearError('commitmentLevel'); }}
                            className={`flex-1 min-w-[35px] sm:min-w-[40px] h-12 sm:h-14 flex items-center justify-center rounded-lg border-2 text-base sm:text-lg font-black cursor-pointer transition-all ${commitmentLevel === num ? 'bg-primary border-primary text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] scale-110 z-10' : errors.commitmentLevel ? 'border-red-500/50 text-red-500' : 'bg-[#1a1a1a] border-white/10 text-zinc-500 hover:border-white/30 hover:text-white'}`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm text-zinc-500 font-medium max-w-4xl px-2">
                        <span>Not committed</span>
                        <span className="text-primary/80">Highly committed</span>
                      </div>
                      <ErrorMsg field="commitmentLevel" />
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="text-white text-sm font-semibold flex items-center gap-1">
                        Is there anything else you think I should know before designing your program?
                      </label>
                      <div className="relative mt-2">
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-5 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 min-h-[140px] resize-none custom-scrollbar"
                          placeholder="Type your message here... Any specific preferences, constraints, or previous experiences?"
                        />
                        <div className="absolute bottom-5 right-5 pointer-events-none text-primary">
                          <Edit3 className="w-5 h-5 opacity-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minimal Footer & Quote */}
                <div className="border-t border-white/10 pt-8 mt-8">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-8">

                    <div className="flex-1 space-y-5">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5 opacity-80" />
                        <div>
                          <h4 className="text-white text-sm font-bold mb-1">Privacy is Our Priority</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">All information is confidential and used only to design your personalized program.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5 opacity-80" />
                        <div>
                          <h4 className="text-white text-sm font-bold mb-1">100% Secure Data</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">Your data is fully encrypted and will never be shared with any third party.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 lg:max-w-md w-full flex flex-col justify-center items-start lg:items-end text-left lg:text-right border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 pl-0 lg:pl-8">
                      <div className="relative">
                        <span className="absolute -top-3 -left-4 text-4xl text-white/10 font-serif">"</span>
                        <p className="text-zinc-400 text-sm italic leading-relaxed relative z-10 pl-2 lg:pl-0">
                          Your transformation starts with the right plan. Let&apos;s build a stronger, healthier you.
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col lg:items-end">
                        <span className="text-primary text-lg font-black uppercase tracking-wider font-heading">- Ankit Baliyan</span>
                        <span className="text-sm font-bold text-white mt-1">15+ Years Experience</span>
                        <span className="text-xs text-zinc-400 mt-1 max-w-[250px]">ASCA Level 2, ACE, NASM CES, ISSA NUTRITIONIST</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Actions for Step 3 */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                  <button type="button" onClick={handleBack} className="group flex items-center justify-center h-12 lg:h-14 px-6 lg:px-8 bg-transparent border border-white/10 text-white text-sm lg:text-base font-bold tracking-wide uppercase transition-all hover:bg-white/5 rounded-lg w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:-translate-x-1" />
                    Back
                  </button>

                  <div className="flex-1 max-w-sm w-full flex flex-col items-center gap-2 lg:gap-3">
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]" />
                    </div>
                    <span className="text-zinc-400 text-xs lg:text-sm font-medium">Final Step - Ready to Submit</span>
                  </div>

                  <button type="submit" className="group flex items-center justify-center h-12 lg:h-14 px-8 lg:px-10 bg-primary text-black text-sm lg:text-base font-black tracking-wide uppercase transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)] rounded-lg w-full sm:w-auto">
                    Submit Application
                    <Send className="ml-2 lg:ml-3 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
