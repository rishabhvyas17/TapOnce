"use client"

import { Upload, X } from "lucide-react"
import React, { useRef, useState } from "react"

interface PersonalizationFormProps {
    name: string
    title: string
    logoUrl: string
    onNameChange: (name: string) => void
    onTitleChange: (title: string) => void
    onLogoChange: (url: string) => void
}

export default function PersonalizationForm({
    name,
    title,
    logoUrl,
    onNameChange,
    onTitleChange,
    onLogoChange
}: PersonalizationFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                onLogoChange(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Personalize Your Card</h3>

            {/* Name Input */}
            <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Name (Line 1) <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => onNameChange(e.target.value.toUpperCase())}
                    placeholder="JOHN DOE"
                    maxLength={25}
                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-all uppercase tracking-wider font-semibold"
                />
                <div className="flex justify-end pt-1">
                    <span className="text-[10px] text-zinc-400 font-mono">{name.length}/25 characters</span>
                </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Title (Line 2)
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Founder & CEO"
                    maxLength={30}
                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-all font-semibold"
                />
                <div className="flex justify-end pt-1">
                    <span className="text-[10px] text-zinc-400 font-mono">{title.length}/30 characters</span>
                </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Logo / Brand Photo
                </label>

                {logoUrl ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 flex items-center justify-center p-2 shadow-inner">
                        <img src={logoUrl} alt="Card logo" className="max-w-full max-h-full object-contain" />
                        <button
                            type="button"
                            onClick={() => onLogoChange("")}
                            className="absolute top-1.5 right-1.5 h-4.5 w-4.5 bg-red-500 hover:bg-red-650 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                            aria-label="Remove logo"
                        >
                            <X className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${dragActive
                                ? "border-primary bg-primary/5"
                                : "border-zinc-250 hover:border-zinc-400 bg-zinc-50/50"
                            }`}
                    >
                        <Upload className="h-5 w-5 text-zinc-400 mx-auto mb-2" />
                        <p className="text-xs text-zinc-500">
                            Drag your logo here, or <span className="text-primary font-bold">browse</span>
                        </p>
                        <p className="text-[9px] text-zinc-400 font-mono mt-1 uppercase">[PNG, JPG formats • MAX 5MB]</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>
        </div>
    )
}
