"use client"

import { Upload, X } from "lucide-react"
import React, { useRef, useState } from "react"
import Image from "next/image"

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
        <div className="space-y-5">
            <h3 className="text-base font-bold text-white tracking-tight">Personalize Your Card</h3>

            {/* Name Input */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400">
                    Name (Line 1) <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => onNameChange(e.target.value.toUpperCase())}
                    placeholder="JOHN DOE"
                    maxLength={25}
                    className="w-full px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all uppercase tracking-wider font-semibold"
                />
                <div className="flex justify-end">
                    <span className="text-[10px] text-zinc-550">{name.length}/25 characters</span>
                </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400">
                    Title (Line 2)
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Founder & CEO"
                    maxLength={30}
                    className="w-full px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all"
                />
                <div className="flex justify-end">
                    <span className="text-[10px] text-zinc-550">{title.length}/30 characters</span>
                </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400">
                    Logo / Photo
                </label>

                {logoUrl ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/[0.08] bg-zinc-950">
                        <img src={logoUrl} alt="Card logo" className="w-full h-full object-contain p-2" />
                        <button
                            type="button"
                            onClick={() => onLogoChange("")}
                            className="absolute top-1.5 right-1.5 h-5 w-5 bg-red-650 hover:bg-red-700 active:scale-90 rounded-full flex items-center justify-center transition-transform"
                            aria-label="Remove logo"
                        >
                            <X className="h-3 w-3 text-white" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragActive
                                ? "border-primary bg-primary/5"
                                : "border-white/[0.08] hover:border-white/[0.15] bg-zinc-900/20"
                            }`}
                    >
                        <Upload className="h-6 w-6 text-zinc-500 mx-auto mb-2" />
                        <p className="text-xs text-zinc-400">
                            Drag your logo here, or <span className="text-primary font-medium">browse</span>
                        </p>
                        <p className="text-[10px] text-zinc-600 mt-1">PNG, JPG formats (max 5MB)</p>
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
