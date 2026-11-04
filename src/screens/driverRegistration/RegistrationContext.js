import React, { createContext, useState, useContext, useMemo } from 'react';

//AI-assistant: see docs/AI_LOG.md #4
//aunque sea con ayuda de ia, estoy escribiendo cada linea para entender por mi parte
const RegistrationContext = createContext(null);

const initialForm = {
    personal: {
        profilePhoto: '',
        fullName: '',
        identityNumber: '',
        phone: '',
        birthDate: '',
        gender: '',
        email: '',
        language: '',
    },
    vehicle: {
        category: '',
        plate: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        capacity: '',
        vehiclePhoto: '',
    },
    documents: {
        licenseNumber: '',
        licensePhoto: '',
        licenseExpiration: '',
        soatPhoto: '',
        soatExpiration: '',
        technicalReviewPhoto: '',
        technicalReviewExpiration: '',
        mercadoPagoEmail: '',
        acceptedTerms: false,
    },
};

export function RegistrationProvider({ children }) {
    const [form, setForm] = useState(initialForm);

    function updateSection(section, field, value) {
        setForm((previousForm) => ({
            ...previousForm,
            [section]: {
                ...previousForm[section],
                [field]: value,
            },
        }));
    }

    const formIsComplete = useMemo(() => {
        const { personal, vehicle, documents } = form;

        const personalComplete =
            personal.fullName.trim() !== '' &&
            personal.identityNumber.trim() !== '' &&
            personal.phone.trim() !== '' &&
            personal.birthDate.trim() !== '' &&
            personal.gender.trim() !== '' &&
            personal.email.trim() !== '';

        const vehicleComplete =
            vehicle.category.trim() !== '' &&
            vehicle.plate.trim() !== '' &&
            vehicle.brand.trim() !== '' &&
            vehicle.model.trim() !== '' &&
            vehicle.year.trim() !== '' &&
            vehicle.color.trim() !== '' &&
            vehicle.capacity.trim() !== '';

        const documentsComplete =
            documents.licenseNumber.trim() !== '' &&
            documents.licenseExpiration.trim() !== '' &&
            documents.soatExpiration.trim() !== '' &&
            documents.mercadoPagoEmail.trim() !== '' &&
            documents.acceptedTerms === true;

        return personalComplete && vehicleComplete && documentsComplete;
    }, [form]);

    const value = {
        form,
        updateSection,
        formIsComplete,
    };

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );
}
export function useRegistration() {
    const context = useContext(RegistrationContext);

    if(!context) {
        throw new Error(
            'useRegistration debe utilizarse dentro de un RegistrationProvider'
        )
    }
    return context;
}