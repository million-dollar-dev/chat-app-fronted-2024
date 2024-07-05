import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const languages = [
    { code: 'en', lang: 'English' },
    { code: 'vi', lang: 'Vietnamese' },
    { code: 'jp', lang: 'Japanese' },
];

const ChangeLanguageButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const languageDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.body.dir = languageDir;
    }, [i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-80 text-black p-4 rounded-lg">
            <button
                onClick={toggleDropdown}
                className="w-full text-left bg-gray-100 p-2 rounded-md flex items-center justify-between"
            >
                <span className="flex flex-row items-center">
                <img src={`/icons/${i18n.language}_flag.png`} alt='' width={20} height={20}/>
                <span className="pl-2">{languages.find(lang => lang.code === i18n.language)?.lang || 'Select Language'}</span></span>
                <span>&#x25BC;</span>
            </button>
            {isOpen && (
                <ul className="absolute bg-gray-200 mt-2 rounded-lg" style={{"width": 290}}>
                    {languages.map((lng) => (
                        <li
                            key={lng.code}
                            onClick={() => {
                                changeLanguage(lng.code);
                                setIsOpen(false);
                            }}
                            className={`flex items-center p-2 cursor-pointer hover:bg-gray-300 ${
                                lng.code === i18n.language ? 'bg-primary' : ''
                            }`}
                        >
                            <img src={`/icons/${lng.code}_flag.png`} alt='' width={20} height={20}/>
                            <span className="mr-2 pl-2">{lng.lang}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChangeLanguageButton;
