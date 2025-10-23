import React, { useState } from 'react';

// Mendefinisikan tipe data untuk kualitas dan keterbacaan kode yang lebih baik
interface Age {
  years: number;
  months: number;
  days: number;
}

interface Errors {
  day?: string;
  month?: string;
  year?: string;
  general?: string;
}

interface GenerationInfo {
    name: string;
    emoji: string;
    description: string;
}

// Komponen Ikon Panah
const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
        <g fill="none" stroke="#FFF" strokeWidth="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
        </g>
    </svg>
);

// Komponen InputField
interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, value, onChange, error }) => {
    const labelColor = error ? 'text-red-500' : 'text-gray-500';
    const borderColor = error ? 'border-red-500' : 'border-gray-300 focus:border-blue-600';

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className={`uppercase text-sm font-bold tracking-widest transition-colors ${labelColor}`}>
                {label}
            </label>
            <input
                id={id}
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-3 text-xl md:text-2xl font-bold border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${borderColor}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && <p id={`${id}-error`} className="text-red-500 italic text-xs mt-1">{error}</p>}
        </div>
    );
};

// Komponen SelectField untuk Dropdown Bulan
const bulanIndonesia = [
    { value: '1', name: 'Januari' }, { value: '2', name: 'Februari' },
    { value: '3', name: 'Maret' }, { value: '4', name: 'April' },
    { value: '5', name: 'Mei' }, { value: '6', name: 'Juni' },
    { value: '7', name: 'Juli' }, { value: '8', name: 'Agustus' },
    { value: '9', name: 'September' }, { value: '10', name: 'Oktober' },
    { value: '11', name: 'November' }, { value: '12', name: 'Desember' },
];

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    options: { value: string; name: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, value, onChange, error, options }) => {
    const labelColor = error ? 'text-red-500' : 'text-gray-500';
    const borderColor = error ? 'border-red-500' : 'border-gray-300 focus:border-blue-600';

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className={`uppercase text-sm font-bold tracking-widest transition-colors ${labelColor}`}>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full p-3 text-xl md:text-2xl font-bold border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors bg-white appearance-none ${borderColor}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
            >
                <option value="" disabled>Bulan</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <p id={`${id}-error`} className="text-red-500 italic text-xs mt-1">{error}</p>}
        </div>
    );
};

// Komponen Pop-up Generasi
const GenerationPopup: React.FC<{ info: GenerationInfo; onClose: () => void }> = ({ info, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center transform transition-all duration-300 animate-popup-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-6xl mb-4">{info.emoji}</div>
                <h2 className="text-4xl font-extrabold text-blue-600 mb-2">Kamu {info.name}!</h2>
                <p className="text-gray-600 mb-6">
                    {info.description}
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Keren!
                </button>
            </div>
        </div>
    );
};

export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState<Age | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [generationInfo, setGenerationInfo] = useState<GenerationInfo | null>(null);

  const getGenerationDetails = (birthYear: number): GenerationInfo | null => {
    const currentYear = new Date().getFullYear();
    const groovyStartYear = currentYear - 27;
    const groovyEndYear = currentYear - 15;

    if (birthYear >= groovyStartYear && birthYear <= groovyEndYear) {
        return { name: "member groovy", emoji: "🕺", description: "Kamu adalah bagian dari generasi groovy, selalu up-to-date dengan tren terkini dan punya style yang asik!" };
    }
    if (birthYear >= 2013) {
        return { name: "Generasi Alpha", emoji: "📱", description: "Generasi pertama yang lahir sepenuhnya di abad ke-21, tumbuh besar dengan tablet dan AI." };
    }
    if (birthYear >= 1997) {
        return { name: "Generasi Z", emoji: "🎉", description: "Pribumi digital, penentu tren, dan ahli di dunia internet." };
    }
    if (birthYear >= 1981) {
        return { name: "seorang Milenial", emoji: "🥑", description: "Kamu telah menyaksikan lahirnya internet dan maraknya media sosial." };
    }
    if (birthYear >= 1965) {
        return { name: "Generasi X", emoji: "🎸", description: "Jembatan antara dunia analog dan digital, dikenal dengan kemandirianmu." };
    }
    if (birthYear >= 1946) {
        return { name: "seorang Baby Boomer", emoji: "✌️", description: "Bagian dari generasi yang membentuk dunia modern dengan musik rock and roll." };
    }
    if (birthYear >= 1928) {
        return { name: "dari Generasi Hening", emoji: "📻", description: "Dikenal karena ketangguhan, kerja keras, dan nilai-nilai tradisional." };
    }
    return null;
  };

  const validateInput = (): boolean => {
    const newErrors: Errors = {};
    const today = new Date();
    const currentYear = today.getFullYear();

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!day) newErrors.day = 'Wajib diisi';
    if (!month) newErrors.month = 'Wajib diisi';
    if (!year) newErrors.year = 'Wajib diisi';

    if (day && (d < 1 || d > 31)) newErrors.day = 'Hari tidak valid';
    if (month && (m < 1 || m > 12)) newErrors.month = 'Bulan tidak valid';
    if (year && y > currentYear) newErrors.year = 'Harus waktu lampau';
    if (year && y < 1900) newErrors.year = 'Harus setelah 1900';

    if (day && month && year && !newErrors.day && !newErrors.month && !newErrors.year) {
        const birthDate = new Date(y, m - 1, d);
        if (birthDate.getFullYear() !== y || birthDate.getMonth() + 1 !== m || birthDate.getDate() !== d) {
            newErrors.day = 'Tanggal tidak valid';
            newErrors.month = ' ';
            newErrors.year = ' ';
        } else if (birthDate > today) {
            newErrors.general = 'Tanggal harus di waktu lampau.';
            newErrors.day = ' ';
            newErrors.month = ' ';
            newErrors.year = ' ';
        }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerationInfo(null);
    if (!validateInput()) {
        setAge(null);
        return;
    }
    
    const birthYear = parseInt(year, 10);
    const birthDate = new Date(birthYear, parseInt(month) - 1, parseInt(day));
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
    
    const genDetails = getGenerationDetails(birthYear);
    if (genDetails) {
        setGenerationInfo(genDetails);
    }
  };

  const AgeDisplay: React.FC<{ value: number | string, label: string }> = ({ value, label }) => (
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold italic tracking-tight">
        <span className="text-blue-600">{value}</span> {label}
    </h1>
  );

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-3xl rounded-br-[100px] md:rounded-br-[150px] shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
            <div className="flex gap-4 md:gap-6">
              <InputField 
                id="day" 
                label="Hari" 
                placeholder="HH" 
                value={day} 
                onChange={(e) => setDay(e.target.value)} 
                error={errors.day}
              />
              <SelectField
                id="month"
                label="Bulan"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                error={errors.month}
                options={bulanIndonesia}
              />
              <InputField 
                id="year" 
                label="Tahun" 
                placeholder="TTTT" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                error={errors.year}
              />
            </div>

            <div className="relative flex items-center my-8 md:my-4">
                <hr className="w-full border-t border-gray-200" />
                <button
                    type="submit"
                    className="absolute right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-4 transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Hitung usia"
                >
                    <ArrowIcon />
                </button>
            </div>
        </form>

        <section className="flex flex-col gap-0" aria-live="polite">
            { errors.general && <p className="text-red-500 italic text-sm text-center mb-4">{errors.general}</p> }
            <AgeDisplay value={age ? age.years : '--'} label="tahun" />
            <AgeDisplay value={age ? age.months : '--'} label="bulan" />
            <AgeDisplay value={age ? age.days : '--'} label="hari" />
        </section>
      </div>
      {generationInfo && <GenerationPopup info={generationInfo} onClose={() => setGenerationInfo(null)} />}
    </main>
  );
}
